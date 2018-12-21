---
title: "RabbitMQ - Broken pipe or closed connection."
layout: post
date: 2018-12-20 10:00
image: /assets/images/bash.png
headerImage: false
tag: [rabbitmq]
star: false
category: blog
author: arzzen
commentIssueId: 20
description: RabbitMQ - Broken pipe or closed connection.
---

This article deals about RabbitMQ error: `Broken pipe or closed connection`.
Why the time-out is occurring even after configuring keep-alive under RabbitMQ, 
and what the work-around solution was to prevent further connection time-outs. 

This error indicates that your connection is dead, 
either due to the TCP connection being dropped or that RabbitMQ has closed your connection. 

After consuming a few messages and performing the task as it should, it exits with the following exception:

_exception in `php`_:
```php
PHP Fatal error:  Uncaught PhpAmqpLib\Exception\AMQPRuntimeException: Broken pipe or closed connection in /var/www/vendor/php-amqplib/php-amqplib/PhpAmqpLib/Wire/IO/StreamIO.php:207
```

_or exception in `java`_:
```java
Caused by: java.net.SocketException: Broken pipe
    at java.net.SocketOutputStream.socketWrite0(Native Method) ~[?:1.9.0_24]
    at java.net.SocketOutputStream.socketWrite(SocketOutputStream.java:109) ~[?:1.9.0_31]
    at java.net.SocketOutputStream.write(SocketOutputStream.java:135) ~[?:1.9.0_34]
```

Starting the consumer again, has the same effect. A few messages are consumed and then it exits again.
While checking the queue page in RabbitMQ console, for lot of messages the status would have change the status from `Unacked` to `Ready`.

By default the AMQP client has the prefetch count property set to unlimited, 
which means RabbitMQ would try to send all the messages in the queue to the client and mark the status of those message from Ready to Unacked.
As the TCP Receiver buffer on the client fills up, RabbitMQ cannot send more message to the client, 
therefore the RabbitMQ server times out and closes the connection with the AMQP client. 

## How to stop it from exiting until all messages have been consumed?

You can try change these configuration value;

### Solution #1: increase "prefetch" value:

The prefetch value is used to specify how many messages that are being sent to the consumer at the same time. 
It is used to get as much out of your consumers as possible. 
AMQP has a QoS parameter called [Prefetch](https://www.rabbitmq.com/consumer-prefetch.html) which is max number of unacknowledged 
deliveries that are permitted on a channel. Once the number reaches the configured count, 
RabbitMQ will stop delivering more messages on the channel unless at least one of the outstanding ones is acknowledged.

If you have many consumers, and a short processing time, I recommend a lower prefetch value than for one single or few consumers. 
A too low value will keep the consumers idling a lot since they need to wait for messages to arrive. 
A too high value may keep one consumer busy, while other consumers are being kept in an idling state.

If you have many consumers, and/or a long processing time, I recommend you to set prefetch count to 1 so that messages are 
evenly distributed among all your workers. 

Set the number of messages to prefetch from the broker (php example):
```php
$prefetchSize = null;    // message size in bytes or null, otherwise error
$prefetchCount = 1;      // prefetch count value
$applyPerChannel = null; // can be false or null, otherwise error

$channel->basic_qos($prefetchSize, $prefetchCount, $applyPerChannel);
```
A typical mistake is to have an unlimited prefetch, where one client receives all messages and runs out of memory and crashes, and then all messages are re-delivered again. 

### Solution #2: increase configuration settings:

Configuration setting in the AMQPConnection constructor. 
Note: 0 or greater seconds. May be fractional.

- Timeout in for income activity:
```
read_timeout: 60
```

- Timeout in for outcome activity:
```
write_timeout: 60
```

- Connection timeout:
```
connect_timeout: 60
```

### Solution #3: change "[heartbeat](https://www.rabbitmq.com/heartbeats.html) timeout" value:

```
heartbeat: 30
```

Network can fail in many ways, sometimes pretty subtle (e.g. high ratio packet loss). 
Disrupted TCP connections take a moderately long time (about 11 minutes with default configuration on Linux, 
for example) to be detected by the operating system. AMQP 0-9-1 offers a heartbeat feature to ensure that the 
application layer promptly finds out about disrupted connections (and also completely unresponsive peers). 
Heartbeats also defend against certain network equipment which may terminate "idle" TCP connections when there is no 
activity on them for a certain period of time. 

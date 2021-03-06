---
title: "SSH was not starting correctly on system startup"
layout: post
date: 2019-01-30 10:00
image: /assets/images/bash.png
headerImage: false
tag: [ssh, linux]
star: false
category: blog
author: arzzen
commentIssueId: 23
description: SSH was not starting correctly on system startup.
---

### Problem

In case your reboot your linux server and:
* your SSH was not starting correctly, 
* and you can't connect to server via ssh,

you have a problem with start SSH service.

### As first, find error

Try to connect to your server localy or via web-terminal provided by your server provider.

Secondly, check if ssh service has started `ps aux | grep ssh`, if not, try to start it manually with command `sudo service ssh start`.
If you see something like this: `ssh.service: Unit entered failed state`.
Try these steps:

- check your syslog with `cat /var/log/syslog | grep ssh`, and when you see: `Missing privilege separation directory: /var/run/sshd` continue reading :),
- the following command tells you if configuration file are valid or incorrect `/usr/sbin/sshd -T`,
- if the configuration test does not return any errors, you can start `/usr/sbin/sshd -ddd` in debugging mode, 
this will provide you with a detailed startup of the service.

### Solution is simple

You'll need to create this directory:

`sudo mkdir -p /usr/sbin/sshd` 

* `-p` is an argument to the `mkdir` command, it means "parents", 
meaning `mkdir` will create a directory and any parents that don't already exist.

Than you can start your SSH server: 

`sudo service ssh start`


And that's all.

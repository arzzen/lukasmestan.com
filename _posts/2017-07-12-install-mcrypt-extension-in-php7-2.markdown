---
title: "How to install mcrypt in php7.2"
layout: post
date: 2017-12-20 10:00
image: /assets/images/php-mcrypt.jpg
headerImage: false
tag: [php7, tutorial]
star: false
category: blog
author: arzzen
commentIssueId: 10
description: How to install mcrypt extension in php7.2
---

The _mcrypt_ extension is an interface to the _mcrypt_ cryptography library. 
This extension is useful for allowing PHP code using _mcrypt_ to run on PHP 7.2+.

The main problem with _mcrypt_ extension is that it is based on _libmcrypt_ that hasn't been developped since its upstream in 2007. 
Thus, it has been already 10 years, even though the library has been still used. However, 
without the proper developement and maintenance library has become security alert for many system administrators.

Because of the end of the _mcrypt_ extension's development, 
the extention was also removed from PHP 7.2 and moved to an unofficial PECL repository. 
However, you can still find the _mcrypt_ extention in PHP 5.4 through PHP 7.1. 
The arrival of PHP 7.2 has been announced but it won't contain _mcrypt_ extention. 
For PHP 7.2+, PHP instead uses _libsodium_ as a cryptography library. 

To install this extension on PHP 7.2, run the following commands as your server's root user:

## Verify php and pecl version

```bash
php -v
pecl version
```

If your php isn't 7.2 then use `/usr/bin/php7.2` instead `php` command.


## Install mcrypt extension

Mcrypt [PECL extenstion](http://pecl.php.net/package-info.php?package=mcrypt&version=1.0.1)

```bash
sudo apt-get -y install gcc make autoconf libc-dev pkg-config
sudo apt-get -y install libmcrypt-dev
sudo pecl install mcrypt-1.0.1
```
 When you are shown the prompt

``` 
libmcrypt prefix? [autodetect] :
```
Press [Enter] to autodetect.

After success installing mcrypt trought pecl, you should add mcrypt.so extension to php.ini.

The output will look like this:

```bash
...
Build process completed successfully
Installing '/usr/lib/php/20170718/mcrypt.so'    ---->   this is our path to mcrypt extension lib
install ok: channel://pecl.php.net/mcrypt-1.0.1
configuration option "php_ini" is not set to php.ini location
You should add "extension=mcrypt.so" to php.ini
```

Grab installing path and add to cli and apache2 php.ini configuration.

```
sudo bash -c "echo extension=/usr/lib/php/20170718/mcrypt.so > /etc/php/7.2/cli/conf.d/mcrypt.ini"
sudo bash -c "echo extension=/usr/lib/php/20170718/mcrypt.so > /etc/php/7.2/apache2/conf.d/mcrypt.ini"
```

## Verify that the extension was installed


Run command:

```
php -i | grep "mcrypt"
```

The output will look like this:

``` 
/etc/php/7.2/cli/conf.d/mcrypt.ini
Registered Stream Filters => zlib.*, string.rot13, string.toupper, string.tolower, string.strip_tags, convert.*, consumed, dechunk, convert.iconv.*, mcrypt.*, mdecrypt.*
mcrypt
mcrypt support => enabled
mcrypt_filter support => enabled
mcrypt.algorithms_dir => no value => no value
mcrypt.modes_dir => no value => no value
```

#### FAQ

Q: I see error message: `ERROR: 'phpize' failed` <br>
A: You can install php7.2-dev `apt-get install php7.2-dev`
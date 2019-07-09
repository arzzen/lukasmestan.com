---
title: "How to install libsodium in php7"
layout: post
date: 2018-03-28 10:00
headerImage: false
tag: [php7, tutorial]
star: false
category: blog
author: arzzen
commentIssueId: 11
description: How to install libsodium extension in php7
---

The _Sodium_ crypto library ([libsodium](https://legacy.gitbook.com/book/jedisct1/libsodium/details)) is a modern, easy-to-use software library for encryption, decryption, signatures, password hashing and more.
It is a portable, cross-compilable, installable, packageable fork of NaCl, with a compatible API, and an extended API to improve usability even further.

Its goal is to provide all of the core operations needed to build higher-level cryptographic tools.

Sodium supports a variety of compilers and operating systems, including Windows (with MinGW or Visual Studio, x86 and x64), iOS and Android.

<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- Clanok 2 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-1559149447115060"
     data-ad-slot="7990264026"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

To install this extension on PHP 7.1, run the following commands as your server's root user:

## Verify php and pecl version

```bash
php -v
pecl version
```

If you don't have the PECL package manager installed on your system, make sure you do that first. 
There are guides for installing PECL available on the Internet for virtually every operating system that PHP supports.

If your php isn't 7.1 then use `/usr/bin/php7.1` instead `php` command.

## Install libsodium extension

PECL Libsodium refers to the PHP extension available as a PECL package that exposes the libsodium API for PHP developers.

Version 7.2.0 and newer of the PHP programming language includes the Sodium extension (referred to as ext/sodium) as a core cryptography library. Version 2 of the PHP extension in PECL is compatible with ext/sodium in PHP 7.2.

```bash
sudo pecl install -f libsodium
```

On some Linux distributions such as Debian, you may have to install PECL (php-pear), 
the PHP development package (php-dev) and a compiler (build-essential) prior to running this command.

After success installing libsodium trought pecl, you should add `sodium.so` extension to `php.ini`.

```bash
sudo echo "extension = sodium.so" > /etc/php/7.1/mods-available/sodium.ini
sudo phpenmod sodium 
```

You might be able to achieve this result by running `phpenmod` sodium or `php5enmod` sodium, depending on which webserver you use. Make sure you restart your webserver after installing ext/sodium.

## Verify that the extension was installed

After installing both the library and the PHP extension, make a quick test php script to 
verify that you have the correct version of libsodium installed.

```php
<?php
var_dump([
    SODIUM_LIBRARY_MAJOR_VERSION,
    SODIUM_LIBRARY_MINOR_VERSION,
    SODIUM_LIBRARY_VERSION
]);
```

Or you can verify via terminal:

```
php -i | grep "sodium"
```

The output will look like this:

```
/etc/php/7.1/cli/conf.d/ext-libsodium.ini,
libsodium
libsodium support => enabled
libsodium compiled version => 2.0.10
```

## Can We Use Libsodium on Older PHP and/or If We Cannot Install PHP Extensions?

You're looking for [sodium_compat](https://github.com/paragonie/sodium_compat), which supports PHP 5.2 through 7.2, 
but doesn't support all of libsodium's features. In particular, it provides no password hashing algorithms.


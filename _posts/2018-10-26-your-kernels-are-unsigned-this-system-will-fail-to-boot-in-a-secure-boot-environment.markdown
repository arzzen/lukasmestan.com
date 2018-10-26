---
title: "Your kernels are unsigned. This system will fail to boot in a secure boot environment."
layout: post
date: 2018-10-26 10:00
image: /assets/images/bash.png
headerImage: false
tag: [ubuntu, update, kernel]
star: false
category: blog
author: arzzen
commentIssueId: 16
description: Your kernels are unsigned. This system will fail to boot in a secure boot environment. 
---


When I was updating and upgrading my software (`sudo apt update` and `sudo apt upgrade`), 
and error for the packages `grub-efi-amd64` and `grub-efi-amd64-signed` occured.

## What is Secure Boot?

In addition to implementing a new boot protocol, EFI adds a new feature that can improve system security, 
but that also has the potential to cause a great deal of confusion and trouble: Secure Boot. 
As the name implies, Secure Boot is intended as a security feature. 
By its very nature, though, Secure Boot can also make it harder to boot Linux, particularly on commodity PCs that 
ship with Windows pre-installed. 

With Secure Boot active, the firmware checks for the presence of a cryptographic signature on any EFI program that it executes. 
If the cryptographic signature is absent, 
doesn't correspond to a key held in the computer's NVRAM, or is blacklisted in the NVRAM, the firmware refuses to execute the program. 
Until late 2012, this has been true of most production EFI implementations, too.

## Grub won't update since my kernel is unsigned. How do I get a signed kernel?

If you see this error message after update:

`E: Your kernels are unsigned. This system will fail to boot in a secure boot environment.`

or something like this:

```
E: Your kernels are unsigned. This system will fail to boot in a secure boot environment.

dpkg: error processing package grub-efi-amd64 (--configure):
 installed grub-efi-amd64 package post-installation script subprocess returned error exit status 1

dpkg: dependency problems prevent configuration of grub-efi:
 grub-efi depends on grub-efi-amd64 (= 2.02-2ubuntu8.7); however:
  Package grub-efi-amd64 is not configured yet.

dpkg: error processing package grub-efi (--configure):
 dependency problems - leaving unconfigured

No apport report written because the error message indicates its a followup error from a previous failure.
```

**You have unsigned linux kernel...** This simply mean: your kernel is unsigned but your grub require signed kernel.
(The packages are unsigned and now grub is complaining about it at each update.)


## Follow these simple steps to resolve this issue

First, you must find your actual kernel version, which you have:

```bash
uname -r

4.17.2-041702-generic # <---- Your linux version may vary!
```
‍
Then find what linux-image you have installed:
```bash
ls /boot/

abi-4.15.0-23-generic             memtest86+.elf
abi-4.15.0-34-generic             memtest86+_multiboot.bin
abi-4.17.2-041702-generic         retpoline-4.15.0-23-generic
config-4.15.0-23-generic          retpoline-4.15.0-34-generic
config-4.15.0-34-generic          retpoline-4.17.2-041702-generic
config-4.17.2-041702-generic      System.map-4.15.0-23-generic
efi                               System.map-4.15.0-34-generic
grub                              System.map-4.17.2-041702-generic
initrd.img-4.15.0-23-generic      vmlinuz-4.15.0-23-generic
initrd.img-4.15.0-34-generic      vmlinuz-4.15.0-34-generic
initrd.img-4.17.2-041702-generic  vmlinuz-4.17.2-041702-generic # <------ These is our linux image!
memtest86+.bin
```

Run package manager and search for a filename (our installed linux image) from installed packages:
```bash
dpkg -S /boot/vmlinuz-4.17.2-041702-generic

linux-image-unsigned-4.17.2-041702-generic: /boot/vmlinuz-4.17.2-041702-generic
```
‍
List packages matching given our version:
```
dpkg --list | grep 4.17.2

ii  linux-headers-4.17.2-041702                4.17.2-041702.201806160433                 all          Header files related to Linux kernel version 4.17.2
ii  linux-image-unsigned-4.17.2-041702-generic 4.17.2-041702.201806160433                 amd64        Linux kernel image for version 4.17.2 on 64 bit x86 SMP
ii  linux-modules-4.17.2-041702-generic        4.17.2-041702.201806160433                 amd64        Linux kernel extra modules for version 4.17.2 on 64 bit x86 SMP
```

Find linux kernel using our version (with headers and modules):
```
dpkg --list | grep 4.17.2 | awk '{print $2}'

linux-headers-4.17.2-041702
linux-image-unsigned-4.17.2-041702-generic
linux-modules-4.17.2-041702-generic
```
‍
Then you must uninstall old linux kernel... (run this command to remove it from system): 
```
sudo apt-get purge $(dpkg --list | grep 4.17.2 | awk '{print $2}')

[sudo] password for luke:
Reading package lists... Done
Building dependency tree
Reading state information... Done
The following packages will be REMOVED:
linux-headers-4.17.2-041702* linux-image-unsigned-4.17.2-041702-generic*
linux-modules-4.17.2-041702-generic*
0 upgraded, 0 newly installed, 3 to remove and 0 not upgraded.
2 not fully installed or removed.
After this operation, 308 MB disk space will be freed.
Do you want to continue? [Y/n] y
(Reading database ... 203507 files and directories currently installed.)
Removing linux-headers-4.17.2-041702 (4.17.2-041702.201806160433) ...
Removing linux-image-unsigned-4.17.2-041702-generic (4.17.2-041702.201806160433) ...
W: Removing the running kernel
I: /vmlinuz.old is now a symlink to boot/vmlinuz-4.15.0-23-generic
I: /initrd.img.old is now a symlink to boot/initrd.img-4.15.0-23-generic
/etc/kernel/postrm.d/initramfs-tools:
update-initramfs: Deleting /boot/initrd.img-4.17.2-041702-generic
```

After that, run final step `apt update` and then `apt upgrade`.

#### TL&DR

After running `apt update` this error can occure:

```
The link /vmlinuz.old is a damaged link
Removing symbolic link vmlinuz.old 
 you may need to re-run your boot loader[grub]
The link /initrd.img.old is a damaged link
Removing symbolic link initrd.img.old 
 you may need to re-run your boot loader[grub]
```

to fix it you should run: 
```
sudo update-grub
```

If there is no warning shown, there is no problem. 
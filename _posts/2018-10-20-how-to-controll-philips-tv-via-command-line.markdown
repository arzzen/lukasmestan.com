---
title: "How to controll Philips tv via command line"
layout: post
date: 2018-10-20 10:00
image: /assets/images/bash-philips-tv.jpg
headerImage: false
tag: [philips, tv, remote, api]
star: true
category: blog
author: arzzen
commentIssueId: 13
description: How to controll Philips tv via command line
---


I wrote a [bash script](https://github.com/arzzen/philips-tv) providing a bunch of functions to control your TV based on most common scripting language easily from command line.
If you own a 2016/2017/2018 model (xxPFL5xx6 to xxPFL9xx6 or xxPUSxxxx), you can now use HTTP JSON queries to do more with the TV.
I have model Philips 49PUS7181 which I tested it on.

This script [https://github.com/arzzen/philips-tv](https://github.com/arzzen/philips-tv) provides a rich set of functions allowing to control your Android TV. 
Basicly it uses HTTP API to send commands to the TV. I use it to switch on/off the TV, select channels etc. 

First, you need to know your IP tv.

## How to find my Philips TV IP?

Check the Network settings on the TV. Press the "Home"-button on the remote control of the television and select:
`[Setup]` > `[Network settings]` > `[View network settings]`

or press "Settings" on the remote control of the TV and select:
`[All settings]` > `[Wireless and networks]` > `[Wired or WiFi]` > `[View network settings]`

<img src="/assets/images/Network_settings_android_1.png" alt="philips tv" />

In this menu the following settings you can see `[IP Address]`. The IP address should not start with numbers 0 or 169.xxx or be empty.

## How can I run the script?

You need to export `_TV_IP` variable for the script. For example `export _TV_IP="192.168.x.x"`.

#### Interactive mode:

```
export _TV_IP="192.168.x.x" && ./tv.sh 
```

When the command is executed for a first time, the script automatically asks for a PIN (one time initialization):

<img src="https://user-images.githubusercontent.com/6382002/39697398-1c09ab34-51f1-11e8-915a-7bad2f26ec28.png" alt="pair code" />

after that, you can execute commands

<img src="https://user-images.githubusercontent.com/6382002/39697521-770c3006-51f1-11e8-8ebb-6ac763ec2221.png" alt="tv commands" />

#### Non-interactive mode (direct execution):

```
export _TV_IP="192.168.x.x" && ./tv.sh <optional-command-to-execute-directly>
```

*Possible arguments:*

* allChannels 
* currentChannel 
* channelUp 
* channelDown 
* volume 
* volumeUp 
* volumeDown 
* ambilightConfig 
* ambilightTopology 
* ambilightCache 
* systemInfo 
* getCommand 
* postCommand

*Custom command:*

You can set variable `_TV_COMMAND` for send custom command (it will affect: "Send GET command" and "Send POST command" )

```
export _TV_IP="192.168.x.x" && export _TV_COMMAND="ambilight/topology" && ./tv.sh getCommand
```

## Usage

<video width="100%" height="420" controls="controls" muted="muted">
<source src="/assets/videos/remote_control.mp4" type="video/mp4">
</video>

## Installation on Unix like OS

```
git clone https://github.com/arzzen/philips-tv.git && cd philips-tv
sudo make install
```

For uninstalling, open up the cloned directory and run `sudo make uninstall`. For update/reinstall `sudo make reinstall`

#### System requirements

Unix like OS with a proper shell, openssl ; curl ; base64 ; awk ; sed ; tr ; echo ; grep ; cut ; sort ; head ; fold ; uniq ; column.
Dependences jq (`apt install jq`)

## TL&DR:

* The script reflects my scenario and doesn't have the target to be a universal implementation supporting all types of Android TVs. Is was tricky to get everything running, esp. the fact that the TV is accepting the connection.
* I'm not a bash expert, so maybe some optimizations and more specific error handling could be supplied.

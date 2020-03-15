---
title: "How to use .mailmap file in git repository"
layout: post
date: 2020-03-14 10:00
image: /assets/images/bash.png
headerImage: false
tag: [git, repository, bash]
star: false
category: blog
author: arzzen
commentIssueId: 31
description: How to use .mailmap file in git repository.
---

Each commit in a repo has an Author field on which is listed the author's name and email 
address: "Author: name ". 
When contributors add to a project from different machines or operating systems, 
it may happen that they use different email addresses or names for this, which will fragment contributor lists and statistics.

A .mailmap file may be created in any text editor and is just a plain text file 
containing optional contributor names, primary email addresses, and their aliases. 
It has to be placed in the project's root, next to the .git directory.

> Keep in mind that this just modifies the visual output of commands like `git shortlog` or `git log --use-mailmap`. 
This will not rewrite commit history or prevent commits with varying names and/or email addresses.

## Anatomy of .mailmap file

In the simple form, each line in the file consists of the canonical
real name of an author, whitespace, and an email address used in the
commit (enclosed by '<' and '>') to map to the name. 

```
Foo Name <foo@email> commit name <commit@email>
\--------+---------/ \----------+-------------/
         |                      |
      replace                  find
```

The email (or name and email) in the "find" part of the entry will be used in a case-insensitive way to 
identify a git author and replace it with whatever is included in the "replace" part

For example:
```
Foo Name <commit@email.xx>
```

The more complex forms are:
```
<foo@email.xx> <commit@email.xx>
```

which allows mailmap to replace only the email part of a commit, and:
```
Foo Name <foo@email.xx> <commit@email.xx>
```

which allows mailmap to replace both the name and the email of a
commit matching the specified commit email address, and:
```
Foo Name <foo@email.xx> Commit Name <commit@email.xx>
```

which allows mailmap to replace both the name and the email of a
commit matching both the specified commit name and email address.

## How to identifying duplicate authors in git history?

Here are some commands that can be run to detect when entries are needed for the .mailmap file.

Find multiple e-mail addresses:
`git log --format='<%ae> %an' | sort -u | awk -F'>' '{print $1}' | uniq -c | grep -v '^ *1'`

Find multiple user names:
`git log --format='<%an> %ae' | sort -u | awk -F'>' '{print $1}' | uniq -c | grep -v '^ *1'`

## Example bash script, that generate .mailmap file

It's simple download [mailmap.sh](https://gist.githubusercontent.com/arzzen/584d75b0da8190d747e9db8b9d47522d/raw/c24a3b56f7d20916218085b80ccec28c3610b13b/mailmap.sh) file 
and then run `./mailmap.sh`

<script src="https://gist.github.com/arzzen/584d75b0da8190d747e9db8b9d47522d.js"></script>

## Conclusion

Merging authors using .mailmap is especially helpful when your team members use different machines or different Git clients.

**Some gotchas:**
- Use hash `#` for comments that are either on their own line, or after the email address.
- The pattern `<address> name` does nothing.
- When copying accented characters from one screen and pasting them into another window, be sure the window supports the accented characters or else they may be lost silently.

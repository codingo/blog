---
layout: post
title:  "What bug classes should I start with, and why?"
date:   2021-04-04 17:01:58 +1000
categories: beginners bug bounty
---

# What bug classes should I start with, and why?

Over time I’ve answered this question a lot, and I’m hoping to build something more canonical I can reference for those starting out with bug bounties - where do you begin? The answer ultimately depends on your foundation, and I’ve aimed to break that down into two distinct answers.


# If you’re new to security

If you’re newer to security, and hacking in general, a hacking foundation is the most important thing to build. If you’re familiar with prior work I’ve written or authored, it’s no secret  that I love [pentesterlab](https://pentesterlab.com/), and I’m regularly giving vouchers for it away (you can find these hidden in videos). The reasoning for that is simple, I believe it to be the best return on investment for somebody building a foundation in security, who may not have a lot of money they’re willing or able to yet dedicate to the acquisition of knowledge.

The building of a foundational experience of hacking is important, but at what point do you have knowledge you can weaponize in a bug bounty program? Often, I hear (and have previously, I believe incorrectly given) the advice that people should start out with CSRF, XSS, or some other easily accessible bug class. I believe that’s a mistake for beginners, for one core reason - it doesn’t help build a foundation in understanding impact, and the connection of impact as it relates to a business.

So what is a proposed, better alternative? In my opinion, and it is an opinion, I believe **authorisation based vulnerabilities** to be the best place to start out as a beginner. There’s a few reasons for that, principally:



*   **They can’t be easily automated**, unlike subdomain takeover type vulnerabilities, or even (to a degree) XSS, authorization based vulnerabilities require interacting with and understanding an application.
*   **They’re easily teachable**, authorisation based vulnerabilities come in a variety of impacts, but at their most basic are as simple as an unauthenticated user being able to perform an action as if they are authenticated. Furthermore, maybe you can perform a paid users permission, without registering? Maybe you can perform an administrative function as a regular user. The depth and variety of bugs can scale with your ability, and they connect quickly with users who are learning as near as anybody can understand the need for each user to have different permissions.
*   **They scale with knowledge**, like any bug class, there’s significant depth to these types of vulnerabilities and a variety of technical implementations and mistakes  that lead to them. As you learn more about the bug bounty space, your ability to uncover more authorization based issues will expand with your newfound abilities, well grounded in a foundation that you will have built when beginning.
*   **They’re typically described in impact, not as a bug class**, the biggest mistake most beginners make is thinking in bug classes, not impact. SQL injection is only reportable because of the impact it creates, not because it has the label of SQL Injection. The benefit of authorisation based vulnerabilities is they force you to think about the impact you’re creating, and what it means to the application or business that you’re working on. 

So where do you begin? Authorisation bugs, at their simplest tend to begin with the ability to perform an action as if you’re performing it on behalf of another user. I recommend learning the mechanics of how websites authorise a user action through ID’s, cookies, and other flows and then starting to see what happens when you manipulate those items. What happens if you perform an action when authenticated with a session cookie, and then try that same request by removing it? What happens when you see a user ID in a request, and try that same request with another user's ID? Pentesterlab has two good resources for starting to learn more about authentication. Firstly, I recommend starting out with the [Essentials Badge](https://pentesterlab.com/badges/essential). After you’ve mastered the basics through there, take a look at the [Authentication/Authorisation](https://pentesterlab.com/badges/auth) badge. A number of the exercises on these videos contain videos, helping you to get started.


# If you’re an experienced hacker, making a move

Assuming you already have a background in hacking, there’s a different approach entirely that you should make when starting out in the bug bounty space. Most people will make the mistake of seeing the number of resources covering reconnaissance (recon), and the tools surrounding it and think that should be where they begin, spending time automating bug classes like subdomain takeovers and the like. Whilst that isn’t bad advice, I don’t think it’s the quickest path to success, and the invested time to a return is high. After all, the public resources for these bug classes are very readily available, and the most valuable items you can perform a takeover on are not included.

My advice if you’re experienced is to learn how to perform recon over time, not point in time recon. The difference is simple, recon over time maps an organisation and how it changes, finding what the company is changing, and where new bugs exist. When you have this crafted, do your thing, assuming you can already hack, follow the process and methodology you normally would, and report what you find.

Essentially, pick an organisation with a healthy scope, map that organisation and review marketing material and other items to work out where they’ve actively worked and what they’re currently changing regularly. Over time, remap that organisation and continue refining and updating your notes to see what else you may want to review - maybe there’s annual or quarterly activities they perform, maybe there’s a customer endpoint that’s regularly being iterated upon. As you identify and map these areas, you’ll find a new/fresh attack surface to work against.

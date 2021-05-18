---
layout: post
title:  "Decompiling C# by Example with Cracknet"
date:   2017-07-25 17:01:58 +1000
tags: [reverse-engineering,ctf]
---

# What is Cracknet?
As a part of the SecTalks May CTF I built a .Net reverse engineering challenge, Cracknet. I've since made this available on Github, [here][cracknetrepo].

Although it's possible to complete this challenge by bypassing a JMP instruction in assembly the intention of this challenge was to introduce participants to decompiling .Net applications by patching the application.

# Exploring CrackNet functionality
When you first open CrackNet you're presented with the following:

![CrackNet First Load](/images/cracknet/1-CrackNet-FirstLoad.png)

When you enter a guess you'll be presented with either the flag, or told it's incorrect and then presented with a countdown until you can make another guess:

![CrackNet Guess Counter](/images/cracknet/2-CrackNet-GuessCounter.png)

This wait time eliminates the ability to brute force the flag and after five incorrect guesses you'll hear a quick mario tune (if system speaker is enabled) and be presented with the following:

![CrackNet GameOver](/images/cracknet/3-Cracknet-GameOver.png)

# Decompiling with dnSpy
## Why and what is dnSpy?
C# is a "jittable" langauge in that it's not compiled purely down to machine code like C is, however it's also not completely interpretted like Python is. C# holds the middle ground and source code written is compiled into an intermediate language (IL) according to the CLI specification. When a C# program is executed, the assembly is loaded into the CLR, then, if all security requirements are met, the CLR performs just in time (JIT) compilation to convert the IL code to native machine instructions.

This brings in a fantistic Github project - [dnSpy]. [dnSpy] is a tool to reverse engineer .NET assemblies from their CLI state back to somewhat interprettable and editable code. It includes a decompiler, a debugger and an assembly editor that allows you to modify or debug .Net applications as required. It's important to note that this code isn't perfect as it's a representation post-compilation from Visual Studio. Redundant blocks in many cases won't be present and program flow and variables will be represented differently. To get a full picture of this you can compare the decompiled version of Cracknet with the source code hosted on Github.

## Loading the project
After cloning the dnSpy repository and opening the project you will be presented with something similar to the following:

![dnSpy initial load](/images/cracknet/4-dnSpy.png)

## Navigate to main
We then want to navigate to the main entry point of our application so we can understand what's happening:

![dnSpy Decompile Main](/images/cracknet/5-DecompileMain.png)

## Patching the application
Looking at the code we can see that the instruction for decrypting the flag can only be reached by entering the result of the decryption (the flag). At this point we could take the Crypto class in this project along with the AES key and create a new application for our flag reveal however it's far more ideal if we instead patch our binary to bypass the if conditional and show the flag early. To do this we first need to select __Edit Method__ in dnSpy (found in the right click menu):

![dnSpy Decompile Main](/images/cracknet/6-EditMethod.png)

We can then relocate our key decrytion to the beginning of the method and comment out the remaining code. If we only move the key decryption and don't comment out the remaining code our key will be overwritten as the screen is redrawn for the timer.

![dnSpy Decompile Main](/images/cracknet/7-PatchedCode.png)

The relevant patched code is as follows:

```csharp
static void Main(string[] args)
{
    Debug.WriteLine("flag{Not a real flag. Strings would be too easy");
    Program.PrintBanner();
    //int guesses = 5;
    Console.WriteLine(string.Format("Success! Flag: {0}!", Crypto.DecryptStringAES("EAAAAB+ljfnegBraKanx/SJLBfrGhIDfffz8MOc922hrm0aK44KwgXmu9GHrIU+LjyBwmQ==")));
    /*			
    while (true)
    {
        bool flag = guesses < 1;
        if (flag)
        {
            Program.PrintGameOver();
        }
        Program.PrintTimer(3);
        Program.PrintGuesses(guesses);
        Console.Write("Enter password: ");
        string input = Console.ReadLine();
        string password = Crypto.DecryptStringAES("EAAAAOkz8XiBpPhe0j3CnxGt4D5Qb0H2vh9/IeXrt1w4r313");
        bool flag2 = input != null && input.ToLower().Equals(password);
        if (flag2)
        {
            Console.WriteLine(string.Format("Success! Flag: {0}!", Crypto.DecryptStringAES("EAAAAB+ljfnegBraKanx/SJLBfrGhIDfffz8MOc922hrm0aK44KwgXmu9GHrIU+LjyBwmQ==")));
            Program.StarWars();
            Environment.Exit(0);
        }
        int num = guesses;
        guesses = num - 1;
        Console.WriteLine("Incorrect! Please wait to try again.");
        Console.Beep(350, 250);
        Console.Beep(300, 500);
    }
    */
    .. remainder redacted ..
```

## Debug and reveal the flag
We then run our patched application within dnSpy to reveal the flag:

![dnSpy Decompile Main](/images/cracknet/9-FlagReveal.png)

And wala!

[cracknetrepo]: https://github.com/codingo/cracknet
[dnSpy]: https://github.com/0xd4d/dnSpy

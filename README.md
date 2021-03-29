# prop-combine-tools ![version](https://img.shields.io/badge/version-1.1.4-blue.svg)

Simple to use tool that helps you make the files needed for prop combine to work for CS:GO.

## Download

- [Latest release](https://github.com/JonasAlmaas/prop-combine-tools/releases/latest)
- [All releases](https://github.com/JonasAlmaas/prop-combine-tools/releases)

No install, just unzip and run!

## OS Support

Currently, Prop Combine Tools is Windows exclusive.

## What is Static Prop Combine?
Static Prop Combine, more often referred to as "Autocombine", is a CS:GO exclusive feature that came with the 2015 version of Nuke.

It allows VBSP to combine multiple static props into one big prop.  rules it follows to do so can either be automatically made when compiling or defined in any text editor or by using this program.

## Why would you use autocombine?

CS:GO players expect extremely high fps on all maps, and autocombine can help you with just that. The way the Source Engine works is that it creates a draw call per material, one for each mesh using said material. By combining meshes that are sharing materials you can greatly reduce the amount of draw calls.

Too many draw calls is often the reason for lag on maps. It's way better to draw a bit of extra geometry than to have a lot of draw calls. Valve stated that after implementing autocombine on Nuke the map ran 40% faster.
                                
As an example, the kegs on the side here are all using the same material, in other words, by combining them into one prop you will reduce the draw calls from seven down to just two.

### More info on how to use it can be found in the built-in guide.

![](https://i.imgur.com/2xX60jl.png)
![](https://i.imgur.com/I8xNjVT.png)
#!/usr/bin/env python3

import asyncio


async def main():
    print('espera 1s ...')
    corot = asyncio.sleep(1)
    await outra()
    await corot
    print('... 1s passou!')


async def outra():
    print('outra 1s ...')
    await asyncio.sleep(2)
    print('... 1s outra!')


asyncio.run(main())

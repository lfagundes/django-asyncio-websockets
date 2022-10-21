#!/usr/bin/env python3

import asyncio


async def espera():
    print('espera 1s ...')
    await asyncio.sleep(1)
    print('... 1s passou!')


async def main():
    await asyncio.wait([
        espera(),
        espera(),
    ])


asyncio.run(main())

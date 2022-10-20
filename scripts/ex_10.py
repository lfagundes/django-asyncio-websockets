#!/usr/bin/env python3

import asyncio
import time

async def main():
    await asyncio.wait([
        rapida(),
        lenta(),
    ])


async def rapida():
    print('espera 1s ...')
    await asyncio.sleep(1)
    print('... 1s passou!')


async def lenta():
    print('espera 2s ...')
    time.sleep(2)
    print('... 2s passou!')


asyncio.run(main())
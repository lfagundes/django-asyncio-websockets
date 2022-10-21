#!/usr/bin/env python3

import asyncio


async def main():
    print('espera 1s ...')
    corot = asyncio.sleep(1)
    await corot
    print('... 1s passou!')


asyncio.run(main())

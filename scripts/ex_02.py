#!/usr/bin/env python3

import asyncio


async def main():
    print('espera 1s ...')
    await asyncio.sleep(1)
    print('... 1s passou!')


asyncio.run(main())

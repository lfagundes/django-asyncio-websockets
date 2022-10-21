#!/usr/bin/env python

import time


def espera():
    print('espera 1s ...')
    time.sleep(1)
    print('... 1s passou!')


def main():
    espera()
    espera()


main()

#!/bin/bash

gulp stylus

DEBUG=server,server:reader supervisor -w index.js,server index &
gulp load &
wait

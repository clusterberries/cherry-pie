#!/bin/bash

gulp stylus

node index.js &
gulp load &
wait

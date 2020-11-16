#!/usr/bin/env bash

export THEMEDIR=$(pwd)/themes/anatole

echo $THEMEDIR

cd src &&
    hugo -t $THEMEDIR

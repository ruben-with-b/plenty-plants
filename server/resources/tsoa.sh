#!/usr/bin/env bash
set -x
# Generate swagger.yaml
cd ..
# Generate swagger.yaml
tsoa swagger
# Generate routes module
tsoa routes
$SHELL
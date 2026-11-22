#!/usr/bin/env bash

# SPDX-FileCopyrightText: 2026 Adam N. Morris
#
# SPDX-License-Identifier: GPL-3.0-only

#
# Installs Zola v0.23.1 (x86_64-unknown-linux-gnu) with sha256 verification.
set -euo pipefail

ZOLA_VERSION="v0.23.6"
ZOLA_TARBALL="zola-${ZOLA_VERSION}-x86_64-unknown-linux-gnu.tar.gz"
ZOLA_SHA256="8f5132b3522412d04e395e0b25f6d68613ad272a873e54a2b3ebf664873024a4"

curl -sL "https://github.com/getzola/zola/releases/download/${ZOLA_VERSION}/${ZOLA_TARBALL}" -o /tmp/zola.tar.gz
echo "${ZOLA_SHA256}  /tmp/zola.tar.gz" | sha256sum --check --strict
tar xzf /tmp/zola.tar.gz -C /tmp
cp /tmp/zola /usr/local/bin/zola
zola --version

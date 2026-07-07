#!/usr/bin/env bash
# SPDX-FileCopyrightText: 2026 Copyright 2026, Adam N. Morris
# SPDX-License-Identifier: GPL-3.0-only
#
# Installs Zola v0.22.1 (x86_64-unknown-linux-gnu) with sha256 verification.
# Runs at image build time (as a devcontainer feature) so the binary lands in
# the published image rather than being reinstalled per CI run.
set -euo pipefail

ZOLA_VERSION="v0.22.1"
ZOLA_TARBALL="zola-v0.22.1-x86_64-unknown-linux-gnu.tar.gz"
ZOLA_SHA256="0ca09aa40376aaa9ddfb512ff9ad963262ef95edb0d0f2d5ec6961b6f5cf22ef"

curl -sL "https://github.com/getzola/zola/releases/download/${ZOLA_VERSION}/${ZOLA_TARBALL}" -o /tmp/zola.tar.gz
echo "${ZOLA_SHA256}  /tmp/zola.tar.gz" | sha256sum --check --strict
tar xzf /tmp/zola.tar.gz -C /tmp
cp /tmp/zola /usr/local/bin/zola
zola --version

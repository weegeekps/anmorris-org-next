#!/usr/bin/env bash

# SPDX-FileCopyrightText: 2026 Adam N. Morris
#
# SPDX-License-Identifier: GPL-3.0-only

#
# Enables the CRB and EPEL 10 repos and then installs the latest version of 
# FSFE's ReUSE tool. CRB and EPEL are left enabled.
#
# This is tested on AlmaLinux but should work everywhere.
set -euo pipefail

# Figure out what Red Hat family distribution this is, and make sure it's
# actually a valid RHEL 10 distro.
DISTRO=$(. /etc/os-release && echo "$ID")
MAJOR_VERSION=$(. /etc/os-release && echo "${VERSION_ID%%.*}")

if [[ ! "$DISTRO-$MAJOR_VERSION" =~ ^(rhel|almalinux|centos|rocky)-10$ ]]; then
    exit 1
fi

# Enable the EPEL repos
if [[ "$DISTRO" == "rhel" ]]; then
    subscription-manager repos --enable "codeready-builder-for-rhel-10-$(arch)-rpms"
    dnf install -y https://fedoraproject.org
else
    dnf config-manager --set-enabled crb
    dnf install -y epel-release
fi

# Install ReUSE
dnf install -y reuse

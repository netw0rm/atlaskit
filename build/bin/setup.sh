#!/usr/bin/env bash
set -e

mkdir -p /root/.ssh/
touch /root/.ssh/known_hosts

BB_KEY="AAAAB3NzaC1yc2EAAAABIwAAAQEAubiN81eDcafrgMeLzaFPsw2kNvEcqTKl/VqLat/MaB33pZy0y3rJZtnqwR2qOOvbwKZYKiEO1O6VqNEBxKvJJelCq0dTXWT5pbO2gDXC6h6QDXCaHo6pOHGPUy+YBaGQRGuSusMEASYiWunYN0vCAI8QaXnWMXNMdFP3jHAJH0eDsoiGnLPBlBp4TNm6rYI74nMzgz3B9IikW4WVK+dc8KZJZWYjAuORU3jc1c/NPskD2ASinf8v3xnfXeukU0sJ5N6m5E8VLjObPEO+mN2t/FZTMZLiFqPWc/ALSqnMnnhwrNi2rbfg/rd/IpL8Le3pSBne8+seeFVBoGqzHM9yXw=="

echo "bitbucket.org ssh-rsa $BB_KEY" >> /root/.ssh/known_hosts
echo "bitbucket.org,104.192.143.1 ssh-rsa $BB_KEY" >> /root/.ssh/known_hosts
echo "bitbucket.org,104.192.143.2 ssh-rsa $BB_KEY" >> /root/.ssh/known_hosts
echo "bitbucket.org,104.192.143.3 ssh-rsa $BB_KEY" >> /root/.ssh/known_hosts

GH_KEY="AAAAB3NzaC1yc2EAAAABIwAAAQEAq2A7hRGmdnm9tUDbO9IDSwBK6TbQa+PXYPCPy6rbTrTtw7PHkccKrpp0yVhp5HdEIcKr6pLlVDBfOLX9QUsyCOV0wzfjIJNlGEYsdlLJizHhbn2mUjvSAHQqZETYP81eFzLQNnPHt4EVVUh7VfDESU84KezmD5QlWpXLmvU31/yMf+Se8xhHTvKSCZIFImWwoG6mbUoWf9nzpIoaSjB+weqqUUmpaaasXVal72J+UX2B+2RPW3RcT0eOzQgqlJL3RKrTJvdsjE3JEAvGq3lGHSZXy28G3skua2SmVi/w4yCE6gbODqnTWlg7+wC604ydGXA8VJiS5ap43JXiUFFAaQ=="

echo "github.com ssh-rsa $GH_KEY"  >> /root/.ssh/known_hosts
echo "github.com,192.30.252.131 ssh-rsa $GH_KEY" >> /root/.ssh/known_hosts
echo "github.com,192.30.253.112 ssh-rsa $GH_KEY" >> /root/.ssh/known_hosts
echo "github.com,192.30.252.129 ssh-rsa $GH_KEY" >> /root/.ssh/known_hosts
echo "github.com,192.30.252.128 ssh-rsa $GH_KEY" >> /root/.ssh/known_hosts
echo "github.com,131.103.20.168 ssh-rsa $GH_KEY" >> /root/.ssh/known_hosts
echo "github.com,192.30.252.130 ssh-rsa $GH_KEY" >> /root/.ssh/known_hosts

npm config set progress false
npm config set color always
npm config set loglevel warn

echo "Installing bitbucket-build-status"
npm install -g bitbucket-build-status@1.0.1

echo "Installing npm-run-all"
npm install -g npm-run-all@3.1.0

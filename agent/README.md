# Strike Host Agent

## Setting Up An Agent

When setting up a staging or production server, storage quotas will be enforced.
To format a disk as xfs, use `sudo mkfs -t xfs /dev/nvme1n1`
This relies on an XFS filesystem with the `pquota` mount option enabled in `/etc/fstab`
Where the first line is the root disk, and the second is the xfs disk. The UUID can be found through `lsblk -f`.

```
LABEL=cloudimg-rootfs   /        ext4   defaults,discard        0 1
UUID=cae6fd33-e991-4194-aa32-d6c45fc70d54 /instances xfs defaults,nofail,pquota 0 2
```

Additionally, docker must be configured to use the disk, /etc/docker/daemon.json

```json
{
  "data-root": "/instances"
}
```

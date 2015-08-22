
use `h5_offline_build`;

#-------------
# Tables
#-------------


drop table if exists `resource`;
create table `resource`(
    `id` int(10) not null auto_increment comment '自增主键。',
    `url` varchar(4096) not null default '' comment '资源路径',
    `size` int(10) not null default 0 comment '资源大小',
    `name` varchar(128) not null default '' comment '资源名称',
    `ctime` DATETIME not null comment '创建时间',
    `start` varchar(16) comment '上线时间',
    `end` varchar(16) comment '下线时间',
    `occasion` char(16) not null comment '资源包类型',
    primary key (`id`)
) engine=innodb default charset=utf8 comment='资源列表';


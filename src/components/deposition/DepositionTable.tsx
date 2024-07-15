"use client";

import React, { useState } from "react";
import { Button, Dropdown, Menu, Table, Typography } from 'antd';
import { IDeposition } from "@/models/Deposition";
import { useRouter } from "next/navigation";
import { CheckCircleFilled, CheckCircleTwoTone, MoreOutlined } from '@ant-design/icons';

const { Text, Link } = Typography;

type DepositionTableProps = {
    datasource: IDeposition[]
}

const DepositionTable: React.FC<DepositionTableProps> = ({ datasource }) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [currentRecordId, setCurrentRecordId] = useState('');
    const navigation = useRouter();
    const witnessNames = ['Brooklyn Simmons', 'Marvin McKinney', 'Kathryn Murphy', 'Robert Fox', 'Jerome Bell'];

    const rowSelection = {
        selectedRowKeys,
        onChange: (newSelectedRowKeys: any) => {
          setSelectedRowKeys(newSelectedRowKeys);
        },
    };

    const handleMenuClick = (e: { key: string; }) => {
        if (e.key === "edit") {
            navigation.push(`/summary/${currentRecordId}`);
        }
    }
    
    const menu = (
        <Menu onClick={handleMenuClick}>
          <Menu.Item key="edit">
            Edit Meatadata
          </Menu.Item>
          <Menu.Item key="delete">
            Delete
          </Menu.Item>
        </Menu>
    );
    
    const columns = [
        { 
            title: 'Deposition', 
            dataIndex: 'filename', 
            key: 'filename',
            render: (_: any, record: IDeposition) => (
                <Link type="secondary">{record.filename}</Link>
            ) 
        },
        { 
            title: 'Witness', 
            dataIndex: 'witness', 
            key: 'witness',
            render: (_: any, record: IDeposition) => (
                <Text>
                    { witnessNames[Math.floor(Math.random() * 5)] }
                </Text>
            ),
        },
        {
            title: 'Depo Date', 
            dataIndex: 'created_at', 
            key: 'created_at',
            render: (text: any) => {
                const date = new Date(text);
                const formattedDate = date.toISOString().split('T')[0];
                return <Text>{formattedDate}</Text>;
            },
        },        
        { 
            title: 'CaseName', 
            dataIndex: 'caseName', 
            key: 'caseName',
            render: (_: any, record: IDeposition) => (
                <Text>
                    Tribbiani vs Geller
                </Text>
            ),
        },
        { title: 'Pages', dataIndex: 'pages', key: 'pages' },
        { 
            title: 'Video', 
            dataIndex: 'video', 
            key: 'video',
            render: (_: any, record: IDeposition) => (
                <>{record.video ? <Text>Yes</Text> : <Text>No</Text>}</>
            ),
        },
        { 
            title: 'File Size', 
            dataIndex: 'fileSize', 
            key: 'fileSize',
            render: (_: any, record: IDeposition) => (
                <>{record.fileSize ? <Text>{record.fileSize}</Text> : <Text>N/A</Text>}</>
            ),
        },
        { 
            title: 'Progress', 
            dataIndex: 'progress', 
            key: 'progress',
            render: (_: any, record: IDeposition) => (
                <>{record.progress ? <Text type='success'><CheckCircleFilled color="green" /> Ready</Text> : <Text><CheckCircleTwoTone /> Ready</Text>}</>
            ),
        },
        {
            title: '',
            dataIndex: 'filename',
            key: 'filename',
            render: (_: any, record: IDeposition) => (
                <Dropdown overlay={menu} trigger={['click']}>      
                    <Button type="text" shape="circle" icon={<MoreOutlined />} onClick={() => setCurrentRecordId(record.depo_id)}></Button>
                </Dropdown>
            )
        }
    ];

    return (
        <Table
            rowSelection={rowSelection}
            dataSource={datasource} 
            columns={columns}
            rowKey="_id" 
        />
    )
}

export default DepositionTable;
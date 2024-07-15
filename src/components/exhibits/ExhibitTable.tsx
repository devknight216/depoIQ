"use client";

import React, { useState } from "react";
import { Button, Dropdown, Menu, Table } from 'antd';
import { IExhibit } from "@/models/Exhibit";
import { useRouter } from "next/navigation";
import { MoreOutlined } from '@ant-design/icons';


type ExhibitTableProps = {
    datasource: IExhibit[]
}

const ExhibitTable: React.FC<ExhibitTableProps> = ({ datasource }) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [currentRecordId, setCurrentRecordId] = useState('');
    const navigation = useRouter();

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
        { title: 'Title', dataIndex: 'title', key: 'title' },
        { title: 'Exhibit Number', dataIndex: 'exhibit_number', key: 'exhibit_number' },
        { title: 'Date', dataIndex: 'date', key: 'date' },
        { title: 'Reference', dataIndex: 'reference', key: 'reference' },
        {
            title: '',
            dataIndex: 'filename',
            key: 'filename',
            render: (_: any, record : IExhibit) => (
                <Dropdown overlay={menu} trigger={['click']}>      
                    <Button type="text" shape="circle" icon={<MoreOutlined />} onClick={() => setCurrentRecordId(record.exhibit_number)}></Button>
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

export default ExhibitTable;
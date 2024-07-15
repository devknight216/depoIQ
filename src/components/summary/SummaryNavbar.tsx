"use client";

import { ArrowLeftOutlined, FileTextOutlined } from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import { useRouter } from 'next/navigation';

type MenuItem = Required<MenuProps>['items'][number];


const items: MenuItem[] = [
    {
      key: 'back',
      label: 'Back',
      icon: <ArrowLeftOutlined />,
    },
    {
      key: 'summary',
      label: 'Summaries',
      icon: <FileTextOutlined />,
    },
];


const SummaryNavbar: React.FC = () => {
    const router = useRouter();
    
    const handleMenuItemClick : MenuProps['onClick'] = ({ key }) => {
        if (key === 'back') {
            router.back();
        }
    }

    return (
        <Menu items={items} selectedKeys={['summary']} onClick={handleMenuItemClick}>              
        </Menu>
    )
}

export default SummaryNavbar;
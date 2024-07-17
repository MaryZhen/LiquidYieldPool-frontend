
import { useFarmModal } from '@/hooks/useFarmModal';
import { Modal, Tabs} from 'antd'
import { useState } from 'react';
import { ClaimPane } from './ClaimPane'
import { StakePane } from './StakePane'
import { UnStakePane } from './UnStakePane'
export default function FarmModal() {
    const {isvisible, activeTabKey, setFormVisible, setActiveTabKey} = useFarmModal();
    
    const defaultitems = [
        {
            label:'Stake',
            key:'1',
            children: StakePane
        },
        {
            label:'Claim',
            key:'2',
            children: ClaimPane
        },
        {
            label:'Unstake',
            key:'3',
            children: UnStakePane
        }
    ]
    const activeKey = activeTabKey
    const [items, setItems] = useState(defaultitems)
    return (
        <Modal
            title={null}
            footer={null}
            open={ isvisible }
            onCancel={() => { setFormVisible(false) }}
        >
            <Tabs
                defaultActiveKey="1"
                type="card"
                activeKey={activeKey}
                items={items.map(item => {
                    return {
                        label: item.label,
                        key: item.key,
                        children: item.children()
                    }
                })}
                onTabClick={(key) => {
                    setActiveTabKey(key)
                }}
            >
            </Tabs>
        </Modal>
    )
}
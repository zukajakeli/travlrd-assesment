'use client';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

type Props = {
  invoices: any;
  setSelectedTab: (value: Tabs) => void;
  selectedTab: Tabs;
};
export type Tabs = 'All' | 'Paid' | 'Pending' | 'Canceled' | 'Overdue';

const StatusTabs = ({ invoices, setSelectedTab, selectedTab }: Props) => {
  const tabs = ['All', 'Paid', 'Pending', 'Canceled', 'Overdue'];

  const TabItem = ({
    value,
    isSelected,
  }: {
    value: Tabs;
    isSelected: boolean;
  }) => (
    <span
      className={clsx('cursor-pointer', {
        'border-b-2': isSelected,
        'border-transparent': !isSelected,
        'text-blue-500': isSelected,
        'text-gray-500': !isSelected,
      })}
      onClick={() => {
        setSelectedTab(value);
        localStorage.setItem('selectedTab', value);
      }}>
      {value}
    </span>
  );

  return (
    <div className='flex gap-4 mb-4'>
      {tabs.map((tab: any) => (
        <TabItem key={tab} value={tab} isSelected={selectedTab === tab} />
      ))}
    </div>
  );
};

export default StatusTabs;

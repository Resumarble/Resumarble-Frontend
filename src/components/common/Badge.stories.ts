import { Meta, StoryObj } from '@storybook/react';
import Badge from './Badge';

const meta = {
  title: 'Common/Badge',
  component: Badge,
  argTypes: {
    text: {
      control: 'text',
    },
    backgroundColor: {
      backgroundColor: { control: 'color' },
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: '뱃지',
    textColor: 'white',
    backgroundColor: '#5f946c',
  },
};

export const Secondary: Story = {
  args: {
    text: '뱃지',
    textColor: 'black',
    backgroundColor: '#5f946c50',
  },
};

export const Danger: Story = {
  args: {
    text: '뱃지',
    textColor: 'white',
    backgroundColor: '#d97474',
  },
};

export const DangerSecondary: Story = {
  args: {
    text: '뱃지',
    textColor: 'white',
    backgroundColor: '#d9747495',
  },
};

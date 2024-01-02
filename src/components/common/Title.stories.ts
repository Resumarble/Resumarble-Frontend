import type { Meta, StoryObj } from '@storybook/react';
import Title from './Title';

const meta = {
  title: 'Common/Title',
  component: Title,
  tags: ['autodocs'],
  args: {
    children: 'text',
  },
} satisfies Meta<typeof Title>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '타이틀',
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta = {
  title: 'Common/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    label: 'basic',
    variant: 'default',
    type: 'button',
  },
};

export const Dark: Story = {
  args: {
    label: 'Dark',
    variant: 'dark',
    type: 'button',
  },
};

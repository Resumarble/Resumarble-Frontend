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

export const Primary: Story = {
  args: {
    size: 'auto',
    label: 'Button',
    variant: 'dark',
    type: 'button',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    label: 'Button',
    variant: 'dark',
    type: 'button',
  },
};

export const Mid: Story = {
  args: {
    size: 'md',
    label: 'Button',
    variant: 'dark',
    type: 'button',
  },
};

export const Full: Story = {
  args: {
    size: 'full',
    label: 'Button',
    variant: 'dark',
    type: 'button',
  },
};

export const White: Story = {
  args: {
    size: 'auto',
    label: 'Button',
    variant: 'default',
    type: 'button',
  },
};

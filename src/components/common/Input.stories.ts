import { Meta, StoryObj } from '@storybook/react';
import Input from './Input';

const meta = {
  title: 'Common/Input',
  component: Input,
  argTypes: {
    label: { control: 'text' },
    type: { control: 'text' },
    required: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RequiredInput: Story = {
  args: {
    id: 'input_01',
    label: 'Label',
    type: 'text',
    required: true,
    placeholder: 'placeholder',
  },
};

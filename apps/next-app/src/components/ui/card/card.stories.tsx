import React from "react";
import { Meta, StoryFn } from "@storybook/react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./card";

export default {
  title: "UI/Card",
  component: Card,
  subcomponents: {
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
  },
} as Meta;

const Template: StoryFn = (args) => (
  <Card {...args}>
    <CardHeader>
      <CardTitle>Card Title</CardTitle>
      <CardDescription>This is a card description.</CardDescription>
    </CardHeader>
    <CardContent>
      <p>This is the card content. You can place any content here.</p>
    </CardContent>
    <CardFooter>
      <button className="btn">Action</button>
    </CardFooter>
  </Card>
);

export const Default = Template.bind({});
Default.args = {
  className: "max-w-md",
};

export const WithCustomStyles = Template.bind({});
WithCustomStyles.args = {
  className: "max-w-lg bg-blue-50 border-blue-200",
};

export const WithoutFooter = (args: React.JSX.IntrinsicAttributes & React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>) => (
  <Card {...args}>
    <CardHeader>
      <CardTitle>Card Without Footer</CardTitle>
      <CardDescription>This card has no footer section.</CardDescription>
    </CardHeader>
    <CardContent>
      <p>
        Without a footer, the card becomes a standalone component without any
        actionable elements.
      </p>
    </CardContent>
  </Card>
);
WithoutFooter.args = {
  className: "max-w-md",
};
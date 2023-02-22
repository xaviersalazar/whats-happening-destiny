import { Card, Text } from "@nextui-org/react";
import { uniqueId } from "lodash";
import Box from "./Box";

interface ActivityProps {
  imageSrc: string;
  subTitle: string;
  title: string;
  description: string;
  children: any;
}

const Activity = ({
  imageSrc,
  subTitle,
  title,
  description,
  children,
}: ActivityProps) => {
  return (
    <div id={uniqueId("activity_")}>
      <div className="rounded-md w-auto h-auto">
        <img className="rounded-xl" src={imageSrc} />
      </div>
      <Card
        variant="flat"
        css={{
          background: "inherit",
          marginTop: "$2",
        }}
      >
        <Box id={uniqueId("information_")} css={{ padding: "$0" }}>
          <Text
            className="text-xs font-light md:text-sm"
            css={{
              letterSpacing: "$widest",
              marginBottom: "$0",
              marginLeft: "$1",
            }}
          >
            {subTitle}
          </Text>
          <Text
            weight="extrabold"
            className="text-4xl md:text-5xl xl:text-6xl"
            css={{
              margin: "$0",
              lineHeight: "$xs",
            }}
          >
            {title}
          </Text>
          <Text
            weight="thin"
            className="text-sm font-light md:text-base"
            css={{
              fontStyle: "italic",
              marginTop: "$4",
              marginLeft: "$1",
            }}
          >
            {description}
          </Text>
          {children}
        </Box>
      </Card>
    </div>
  );
};

export default Activity;

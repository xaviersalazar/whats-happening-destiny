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
    <>
      <div className="rounded-md w-full h-full">
        <img className="rounded-xl" src={imageSrc} />
      </div>
      <Card
        key={uniqueId("activity_")}
        variant="flat"
        css={{
          background: "inherit",
          marginTop: "$0",
        }}
      >
        <Box id={uniqueId("information_")} css={{ padding: "$0" }}>
          <Text
            weight="thin"
            className="text-xs xl:text-sm"
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
            className="text-5xl xl:text-6xl"
            css={{
              margin: "$0",
              lineHeight: "$xs",
            }}
          >
            {title}
          </Text>
          <Text
            weight="thin"
            className="text-sm xl:text-base"
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
    </>
  );
};

export default Activity;

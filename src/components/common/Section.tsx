import { Text } from "@nextui-org/react";
import { uniqueId } from "lodash";
import Box from "./Box";

type SectionProps = {
  id?: string;
  sectionTitle: string;
  className?: string;
  children?: any;
};

const Section = ({ id, sectionTitle, className, children }: SectionProps) => (
  <Box
    id={uniqueId(id)}
    className={className}
    css={{
      marginTop: "$8",
      marginBottom: "$8",
      marginLeft: "$2",
      marginRight: "$2",
    }}
  >
    <Box css={{ width: "fit-content", marginBottom: "$4" }}>
      <Text className="text-md md:text-lg" weight="bold">
        {sectionTitle}
      </Text>
      <Box
        css={{
          width: "75%",
          height: "0.12rem",
          borderRadius: "$2xl",
          background: "$almostBlack",
        }}
      />
    </Box>
    {children}
  </Box>
);

export default Section;

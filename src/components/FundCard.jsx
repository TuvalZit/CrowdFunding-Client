import React, { forwardRef } from "react";
import { Flex, Image, Text } from "theme-ui";

import { profile, tagType, thirdweb } from "../assets";
import { calculateBarPercentage, daysLeft } from "../utils";

const FundCard = forwardRef(
  ({
    _ref,
    owner,
    title,
    description,
    target,
    deadline,
    amountCollected,
    image,
    handleClick,
    handleScroll,
  }) => {
    const remainingDays = daysLeft(deadline);
    return (
      <Flex
        onScroll={handleScroll}
        ref={_ref}
        sx={{
          width: "100%",
          maxHeight: "480px",
          borderRadius: "15px",
          bg: "#1c1c24",
          cursor: "pointer",
          flexDirection: "column",
          ":hover": { boxShadow: "0 0 2pt 2pt #00b9bc" },
        }}
        onClick={handleClick}
      >
        <Image
          src={image}
          alt="fund"
          sx={{
            width: "100%",
            height: "50%",
            objectFit: "cover",
            borderRadius: "15px",
          }}
        />

        <Flex
          sx={{
            flexDirection: "column",
            padding: "20px",
            flex: "1",
          }}
        >
          <Flex
            id="Campaign-Category-Container"
            sx={{
              alignItems: "center",
              mb: "18px",
            }}
          >
            <Image
              src={tagType}
              alt="tag"
              sx={{
                width: "17px",
                height: "17px",
                objectFit: "contain",
              }}
            />
            <Text
              sx={{
                ml: "12px",
                mt: "2px",
                fontFamily: "sans-serif",
                fontWeight: "medium",
                fontSize: "12px",
                color: "#808191",
              }}
            >
              Education
            </Text>
          </Flex>

          <Flex
            id="Campaing-Title-Container"
            sx={{
              flexDirection: "column",
            }}
          >
            <Text
              sx={{
                fontFamily: "sans-serif",
                fontWeight: "semiBold",
                fontSize: "20px",
                color: "white",
                textAlign: "left",
                lineHeight: "26px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {title}
            </Text>
            <Text
              sx={{
                mt: "7px",
                fontFamily: "sans-serif",
                fontWeight: "normal",
                fontSize: "16px",
                color: "#808191",
                textAlign: "left",
                lineHeight: "18px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {description}
            </Text>
          </Flex>

          <Flex
            id="Campaign-Process-Container"
            sx={{
              justifyContent: "space-between",
              flexWrap: "wrap",
              mt: "15px",
              gap: "2px",
            }}
          >
            <Flex id="Raises-Container" sx={{ flexDirection: "column" }}>
              <Text
                sx={{
                  fontFamily: "sans-serif",
                  fontWeight: "semiBold",
                  fontSize: "20px",
                  color: "#b2b3bd",
                  lineHeight: "22px",
                }}
              >
                {amountCollected}
              </Text>
              <Text
                sx={{
                  mt: "3px",
                  fontFamily: "sans-serif",
                  fontWeight: "normal",
                  fontSize: "12px",
                  color: "#808191",
                  lineHeight: "18px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                Raised of {target}
              </Text>
            </Flex>
            <Flex sx={{ flexDirection: "column" }}>
              <Text
                sx={{
                  fontFamily: "sans-serif",
                  fontWeight: "semiBold",
                  fontSize: "20px",
                  color: remainingDays > 0 ? "#b2b3bd" : "#FF3131",
                  lineHeight: "22px",
                }}
              >
                {remainingDays}
              </Text>
              <Text
                sx={{
                  mt: "3px",
                  fontFamily: "sans-serif",
                  fontWeight: "normal",
                  fontSize: "12px",
                  color: "#808191",
                  lineHeight: "18px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                Days Left
              </Text>
            </Flex>
          </Flex>

          <Flex
            id="fund-card-footer"
            sx={{
              alignItems: "center",
              mt: "20px",
              gap: "12px",
            }}
          >
            <Flex
              sx={{
                width: "30px",
                height: "30px",
                borderRadius: "9999px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                src={profile}
                alt="user"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </Flex>
            <Flex
              sx={{
                flext: "1",
              }}
            >
              <Text
                sx={{
                  color: "#b2b3bd",
                  fontFamily: "sans-serif",
                  fontWeight: "normal",
                  fontSize: "12px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                by&nbsp;{owner}
              </Text>
            </Flex>
          </Flex>
          <Flex
            id="progress-bar-frame"
            sx={{
              position: "relative",
              width: "100%",
              height: "5px",
              bg: "#3a3a43",
              mt: "5px",
            }}
          >
            <Flex
              id="progress-bar-process"
              sx={{
                position: "absolute",
                height: "100%",
                bg: "#FF8848",
                width: `${calculateBarPercentage(target, amountCollected)}%`,
                maxWidth: "100%",
              }}
            ></Flex>
          </Flex>
        </Flex>
      </Flex>
    );
  }
);

export default FundCard;

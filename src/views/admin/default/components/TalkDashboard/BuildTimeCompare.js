// Chakra imports
import {
    Box,
    Flex,
    Spacer,
    Icon,
    Text,
    Link,
    useColorModeValue,
  } from "@chakra-ui/react";
  import { LuExternalLink } from "react-icons/lu"
  // Custom components
  import Card from "components/card/Card.js";
  import LineChart from "components/charts/LineChart";
  import React from "react";
  import { IoCheckmarkCircle } from "react-icons/io5";
  import { MdBarChart, MdOutlineCalendarToday } from "react-icons/md";
  // Assets
  import { RiArrowUpSFill } from "react-icons/ri";
  import {
    recentBuildInfo,
    compareYoYNumber,
    compareYoY,
    compareDoDNumber,
    compareDoD,
    lineChartDataTotalSpent,
    lineChartOptionsTotalSpent,
  } from "variables/buildtime";
  
  function plusMinusColor(value) {
    if (value > 0) {
      return "red.500";
    } else {
      return "green.500";
    }
  }

  export default function BinarySizeCompare(props) {
    const { ...rest } = props;
  
    // Chakra Color Mode
  
    const kakaoColor = useColorModeValue("kakao.100", "kakao.100");
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    const iconColor = useColorModeValue("brand.500", "white");
    const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    const commitLink = 'https://github.daumkakao.com/kakaotalk-iphone-dev/KakaoTalk-Iphone/commit/' + recentBuildInfo.sha;
    const appcenterLink = recentBuildInfo.appcenter;
    const bgHover = useColorModeValue(
      { bg: "secondaryGray.400" },
      { bg: "whiteAlpha.50" }
    );
    const bgFocus = useColorModeValue(
      { bg: "secondaryGray.300" },
      { bg: "whiteAlpha.100" }
    );
    return (
      <Card
        justifyContent='center'
        align='center'
        direction='column'
        w='100%'
        mb='0px'
        {...rest}>
        <Flex flexDirection='column' me='20px' mt='20px'>
            <Flex flexDirection='row' gap='20px'>
                <Text
                    color={textColor}
                    fontSize='30px'
                    textAlign='start'
                    fontWeight='700'
                    lineHeight='100%'>
                    Build Time
                </Text>


                <Spacer />

                <Link
                    isExternal
                    textDecoration= 'underline'
                    fontWeight='500'
                    href={commitLink}>
                    Go to commit
                </Link>

                <Link
                    isExternal
                    textDecoration= 'underline'
                    fontWeight='500'
                    href={appcenterLink}>
                    Go to AppCenter
                </Link>
            </Flex>

            <Box minHeight='10px'></Box>

            <Flex align='left' mb='20px' flexDirection='row'>
                <Text
                    color='secondaryGray.900'
                    fontSize='25px'
                    textAlign='start'
                    fontWeight='500'
                    lineHeight='100%'>
                    {recentBuildInfo.time}sec
                </Text>
                <Box w='20px'></Box>
                <Flex align='baseline' flexDirection='row'>
                    <Text
                        color='secondaryGray.600'
                        fontSize='sm'
                        fontWeight='500'
                        align='left'
                        mt='4px'
                        me='4px'>
                        YoY
                    </Text>
                    <Flex align='left'>
                        <Text color={plusMinusColor(compareYoYNumber)} fontSize='sm' fontWeight='700'>
                        {compareYoY}
                        </Text>
                    </Flex>
                </Flex>

                <Box w='20px'></Box>
                <Flex align='baseline' mb='20px' flexDirection='row'>
                <Text
                    color='secondaryGray.600'
                    fontSize='sm'
                    fontWeight='500'
                    mt='4px'
                    me='4px'>
                    DoD
                </Text>
                <Flex align='center'>
                    <Text color={plusMinusColor(compareDoDNumber)} fontSize='sm' fontWeight='700'>
                    {compareDoD}
                    </Text>
                </Flex>

                </Flex>

            </Flex>
  
          </Flex>

        <Flex w='100%' flexDirection={{ base: "column", lg: "row" }}>
          <Box minH='200px' minW='100%' mt='auto'>
            <LineChart
              chartData={lineChartDataTotalSpent}
              chartOptions={lineChartOptionsTotalSpent}
            />
          </Box>
        </Flex>
      </Card>
    );
  }
  
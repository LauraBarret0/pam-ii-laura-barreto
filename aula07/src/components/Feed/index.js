import React from "react";
import { Box, Image, Heading, Text, Icon } from "native-base"

import { Feather } from '@expo/vector-icons'

export default function Feed({ data }){
    return(
        <Box 
          flex={1} 
          flexDir='column' 
          marginBottom={4} 
          backgroundColor='#fff' 
          padding={2}
          borderRadius={4}
        >
          <Box>
            <Image
                source={{uri: data.avatarUrl}}
                alt="Post Feed"
                w='100%'
                h={120}
            />
          </Box>
        </Box>
    )
}
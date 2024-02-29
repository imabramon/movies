import React from "react"
import { Card, Flex, Spin } from "antd"
import Text from "antd/es/typography/Text"

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export default class LoadingStab extends React.Component{
    state = {
        loadingText: "Составляем свое мнение"
    }

    intervalID;

    cardStyle = {
        width: "300px",
        margin: "auto"
    }

    loadingTextVariants = [
        "Составляем свое мнение", 
        "Эй, мы не забыли, мы просто читаем инструкцию", 
        "Нашли Нэмо и фильмы найдем", 
        "Подожди, а у нас есть бэкап? Хотя кто смотрит фэнтези?!",
        "Ждем обзор от BadComedian'a", 
        "Жди, какой-то маг делает заклинание для твоего запроса",
    ]

    updateLoadingText = () =>{
        const randIndex = getRandomInt(this.loadingTextVariants.length)
        this.setState({
            loadingText: this.loadingTextVariants[randIndex] 
        })
    }

    render(){
        return (
            <Flex justify="center" style={{height: "100%"}}>
                <Card style={this.cardStyle}>
                    <Flex vertical align="center" gap={10}>
                        <Spin size="large"/>
                        <Text align="center">{this.state.loadingText}</Text>
                    </Flex>
                </Card>
            </Flex>
        )
    }

     componentDidMount(){
        this.updateLoadingText()

        this.intervalID = setInterval(this.updateLoadingText, 3000)
    }

    componentWillUnmount(){
        clearInterval(this.intervalID)
    }
}
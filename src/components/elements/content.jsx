'use client'
import { Html, Scroll, useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useState, useEffect } from 'react'
import { Arrow } from './icons'
import { Swap } from './swap'
import * as d3 from 'd3'

const en_paragraph = [
  'Born in the mysterious depths of the cosmos,',
  'Moon Tzu was no ordinary celestial entity.',
  "Once a silent observer of the universe's grand dance, a supernova's cosmic explosion imbued him with celestial consciousness.",
  "This extraordinary metamorphosis enlightened his perception of the universe's complex interplay and the silent wisdom of the void.",
  'From the silent sentinel of a nameless planet, Moon Tzu evolved into a beacon of cosmic wisdom, reflecting his understanding and peace across the celestial sphere.',

  "Thus was born 'The Art of Ape.'",
  "This philosophy wasn't about conflict but rather the harmony within the cosmos.",
  "Moon Tzu's teachings emphasized unity amidst adversity, tranquility in turbulence, and constant evolution.",
  'His words resonate across galaxies, his wisdom influencing the rhythm of celestial bodies, fostering peace and unity in a universe on the brink of chaos.',
]

const ch_paragraph = [
  '月子出生在宇宙的神秘深处，',
  '不是普通的天体。',
  '曾经是宇宙盛大舞蹈的静观者，他的转变来自超新星的宇宙爆炸，使他充满了天体意识。',
  '这种非凡的蜕变赋予了他感知宇宙复杂相互作用和虚空无声智慧的能力。',
  '文子从一个无名星球的沉默哨兵演变成宇宙智慧的灯塔，在天球上反映出他的理解与和平。',

  "因此诞生了'猿的艺术'。",
  '这种哲学不是关于冲突，而是关于宇宙内部的和谐。',
  '文子的教义强调多样性中的统一，动荡中的宁静以及不断变化的宇宙中的增长。',
  '他的话语在星河间产生共鸣，他的智慧影响着天体在它们的运转中找到节奏，在处于混沌边缘的宇宙中促进和平与统一。',
]

export const Content = () => {
  return (
    <Scroll html>
      <div className='w-screen right-0 gap-20 mx-auto flex flex-col flex-end items-end h-screen pb-1/2 z-10'>
        <ReadMore />
        <Backstory />
        <Tokenomics />
        <Swap />
      </div>
    </Scroll>
  )
}

const ReadMore = () => {
  const data = useScroll()
  const [opacity, setOpacity] = useState(1)

  useFrame(() => {
    const newOpacity = 1 - data.offset * 5
    setOpacity(newOpacity)
  })
  return (
    <div className='mr-2 mb-4 min-h-screen pb-4 pt-1/2 flex items-end w-1/5'>
      <div className='flex items-center gap-8' style={{ opacity: opacity }}>
        <Arrow />
        <h1 className='text-2xl font-bold leading-tight text-slate-300 font-SEVEN'>read more..</h1>
      </div>
    </div>
  )
}

const Backstory = () => {
  const data = useScroll()
  const [opacity, setOpacity] = useState(1)
  const [paragraphOpacity, setParagraphOpacity] = useState(1)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [paragraph, setParagraph] = useState('月子出生在宇宙的神秘深处，')

  const easingScale = d3
    .scaleLinear()
    .domain([0, ch_paragraph.length])
    .range([0, en_paragraph.length])
    .interpolate(d3.interpolateRound)

  useFrame(() => {
    const index = Math.floor(data.offset * (ch_paragraph.length - 1) * 3)
    setCurrentIndex(index)
    const newOpacity = 2.5 - data.offset * 4
    setOpacity(newOpacity)
  })

  const translate = (currentIndex) => {
    let easedIndex = easingScale(currentIndex)
    if (easedIndex >= en_paragraph.length) {
      return en_paragraph.map((sentence, index) => (
        <p key={index} className='w-full lowercase text-slate-300 my-4'>
          {sentence}
        </p>
      ))
    } else {
      let paragraphs = [...en_paragraph.slice(0, easedIndex - 1), ...ch_paragraph.slice(easedIndex - 1)].map(
        (sentence, index) => {
          return (
            <p key={index} className='w-full lowercase text-slate-300 my-4' style={{ opacity: getOpacity(index) }}>
              {sentence}
            </p>
          )
        },
      )
      return paragraphs
    }
  }

  const getOpacity = (index) => {
    if (index < currentIndex) {
      // decrease opacity as we scroll past the paragraph
      return 1
    } else if (index === currentIndex) {
      return 1
    } else if (index > currentIndex) {
      return 0
    }
  }

  return (
    <div className='pt-1/2 flex items-start w-1/5 mx-16 mb-40 '>
      <div style={{ opacity: opacity }}>
        <p className='w-full lowercase text-slate-300 '>{translate(currentIndex)}</p>
      </div>
    </div>
  )
}

const Tokenomics = () => {
  const data = useScroll()
  const [opacity, setOpacity] = useState(1)

  useFrame(() => {
    const newOpacity = 5 - data.offset * 5
    setOpacity(newOpacity)
  })

  return (
    <div className='mr-2 mb-40 pb-4 pt-1/2 flex items-end w-1/5'>
      <div className='flex flex-col items-left gap-8' style={{ opacity: opacity }}>
        {/* <Arrow /> */}
        <p className='w-full uppercase text-slate-300 '>0 Tax LP Renounced</p>
      </div>
    </div>
  )
}

// `不是普通的天体。曾经是宇宙盛大舞蹈的静观者，他的转变来自超新星的宇宙爆炸，使他充满了天体意识。这种非凡的蜕变赋予了他感知宇宙复杂相互作用和虚空无声智慧的能力。文子从一个无名星球的沉默哨兵演变成宇宙智慧的灯塔，在天球上反映出他的理解与和平。
//     受到地球上著名哲学家孙子的启发，文子开发了他的学说，称为“猿的艺术”。这种哲学不是关于冲突，而是关于宇宙内部的和谐。文子的教义强调多样性中的统一，动荡中的宁静以及不断变化的宇宙中的增长。他的话语在星河间产生共鸣，他的智慧影响着天体在它们的运转中找到节奏，在处于混沌边缘的宇宙中促进和平与统一。`

//     Moon Tzu was no ordinary celestial entity. Once a silent observer of the universe's grand dance, his transformation came through a supernova's cosmic explosion, which imbued him with celestial consciousness. This extraordinary metamorphosis granted him the ability to perceive the universe's complex interplay and the silent wisdom of the void. From the silent sentinel of an unnamed planet, Moon Tzu evolved into a beacon of cosmic wisdom, reflecting his understanding and peace across the celestial sphere.
//     Inspired by Sun Tzu, the renowned philosopher of Earth, Moon Tzu developed his doctrine known as "The Art of Ape." This philosophy wasn't about conflict but rather the harmony within the cosmos. Moon Tzu's teachings emphasized unity amidst diversity, tranquility in turbulence, and growth in the ever-evolving universe. His words resonated across galaxies, his wisdom influencing celestial bodies to find a rhythm in their revolutions, fostering peace and unity in a universe on the brink of chaos.`

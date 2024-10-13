import { border, Button, HStack, Image } from '@chakra-ui/react'
import { FaLink } from 'react-icons/fa'
import CommonButton from './common-button'
import { useLocation, useNavigate } from 'react-router-dom'
import { CgProfile } from 'react-icons/cg'
import { FaRegEye } from 'react-icons/fa6'
import { IoMdLogOut } from 'react-icons/io'
import axiosInstance from '../lib/axios-instance'
import { useState } from 'react'

const Header = () => {
  const { pathname } = useLocation()
  const [isLoading, setIsLoading] = useState(false)

  const NavLinks = [
    {
      size: 'sm',
      icon: FaLink,
      bg: '',
      color: '#7b7b7b',
      text: 'Link',
      border: '0px',
      pathname: '/'
    },
    {
      size: 'sm',
      icon: CgProfile,
      bg: '',
      border: '0px',
      color: '#7b7b7b',
      text: 'Profile details',
      pathname: '/profile-details'
    }
  ]
  const navigate = useNavigate()
  const handleLogout = async () => {
    setIsLoading(true)
    axiosInstance({
      url: '/account/logout',
      method: 'POST'
    })
      .then((data) => {
        console.log(data)
        if (data.status == 200) {
          navigate('/login')
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
  }

  return (
    <HStack
      mt={4}
      p={3}
      justifyContent={'space-between'}
      bg={'#fff'}
      rounded={'md'}
      w={'full'}
      h={'60px'}>
      <Image src='https://i.ibb.co.com/rvpb0wK/Screenshot-2024-10-11-210901.png' />
      <HStack>
        {NavLinks.map((item, i) => {
          let isActive = pathname == item.pathname
          return (
            <CommonButton
              key={`nav-link-${i}`}
              data={{
                ...item,
                break: true,
                className: `${isActive ? 'active' : ''}`,
                handleClick: () => navigate(item.pathname)
              }}
            />
          )
        })}

        {/* <CommonButton
          data={{
            size: 'sm',
            icon: FaLink,
            bg: '#633BEF',
            color: '#ffff',
            text: 'Profile details'
          }}
        /> */}
      </HStack>
      <HStack>
        <CommonButton
          data={{
            size: 'sm',
            break: true,
            icon: FaRegEye,
            bg: '#fff',
            text: 'Preview',
            border: `1px solid #633BEF`,
            handleClick: () => navigate('/preview')
          }}
        />
        <CommonButton
          data={{
            size: 'sm',
            break: true,
            icon: IoMdLogOut,
            isLoading,
            bg: '#fff',
            text: 'Logout',
            color: '#EB393E',
            border: `1px solid #EB393E`,
            handleClick: handleLogout
          }}
        />
      </HStack>
    </HStack>
  )
}

export default Header

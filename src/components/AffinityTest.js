import { useEffect, useState } from 'react'
import { supabase } from '../supabase'

export default function AffinityTest() {
    const answersObj = {
        1: "1",
        2: "1",
        3: "1",
        4: "2",
        5: "2",
        6: "2",
        7: "2",
        8: "3",
        9: "3",
        10: "3",
        11: "4",
        12: "4",
        13: "4",
        14: "5",
        15: "5",
    };
  const [affinityTest, setAffinityTest] = useState(null)
  const [uploading, setUploading] = useState(false)


  return (
    <div>
    
    </div>
  )
}

'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { CoachingExpert } from '@/services/Options';
import { GetDiscussionRoom } from '@/convex/DiscussionRoom';
import Image from 'next/image';
import { UserButton } from '@stackframe/stack';
import { Button } from '@/components/ui/button';

const DiscussionRoomPage = () => {
  const { roomid } = useParams();
  const DiscussionRoomData = useQuery(api.DiscussionRoom.GetDiscussionRoom, {
    id: roomid,
  });
  const [expert, setExpert] = useState(null);
  console.log(DiscussionRoomData);

  useEffect(() => {
    if (DiscussionRoomData) {
      const foundExpert = CoachingExpert.find(
        item => item.name === DiscussionRoomData?.expertName
      );
      setExpert(foundExpert);
      console.log(foundExpert);
    }
  }, [DiscussionRoomData]);

  return (
    <div className="-mt-12">
      <h2 className="text-lg font-bold">
        {DiscussionRoomData?.coachingOption}
      </h2>
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <div className="h-[60vh] bg-secondary border rounded-4xl flex flex-col items-center justify-center relative">
            {expert && (
              <Image
                src={expert.avatar}
                alt="avatar"
                width={200}
                height={200}
                className="h-[80px] w-[80px] rounded-full object-cover animate-pulse"
              />
            )}
            <h2 className="text-gray-500">{expert?.name}</h2>
            <div className="p-5 bg-gray-200 px-10 rounded-lg absolute bottom-10 right-10">
              <UserButton />
            </div>
          </div>
          <div className="mt-5 flex items-center justify-center">
            <Button className="cursor-pointer">Connect</Button>
          </div>
        </div>
        <div>
          <div className="h-[60vh] bg-secondary border rounded-4xl flex flex-col items-center justify-center relative">
            <h2 className="text-gray-500">Chat</h2>
          </div>
          <h2 className="mt-4 text-gray-500 text-sm pl-5">
            At the end of the conversation we will automatically generate
            feedback/notes from your conversation
          </h2>
        </div>
      </div>
    </div>
  );
};

export default DiscussionRoomPage;

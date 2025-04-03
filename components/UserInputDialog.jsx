import React, { useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Textarea } from './ui/textarea';
import { CoachingExpert } from '@/services/Options';
import Image from 'next/image';
import { Button } from './ui/button';
import { useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import { LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
const UserInputDialog = ({ children, coachingOption }) => {
  const [selectedExpert, setSelectedExpert] = useState();
  const [topic, setTopic] = useState();
  const createDiscussionRoom = useMutation(
    api.DiscussionRoom.CreateDiscussionRoom
  );
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const router = useRouter();

  const onClickNext = async () => {
    setLoading(true);
    const result = await createDiscussionRoom({
      topic: topic,
      coachingOption: coachingOption?.name,
      expertName: selectedExpert,
    });
    console.log(result);
    setLoading(false);
    router.push(`/discussion-room/${result}`);
  };

  return (
    <div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{coachingOption.name}</DialogTitle>
            <DialogDescription asChild>
              <div className="mt-1">
                <h2 className="text-black">
                  Enter a topic to master your skills in {coachingOption.name}
                </h2>
                <Textarea
                  placeholder="Enter a topic..."
                  className="mt-2"
                  onChange={e => setTopic(e.target.value)}
                />

                <h2 className="text-black mt-5">Select you coaching expert</h2>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-6 mt-3">
                  {CoachingExpert.map((expert, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedExpert(expert.name)}
                    >
                      <Image
                        src={expert.avatar}
                        alt={expert.name}
                        width={100}
                        height={100}
                        className={`rounded-2xl h-[80px] w-[80px] object-cover
                        hover:scale-105 transition-all duration-200 cursor-pointer p-1
                        ${selectedExpert === expert.name && 'border border-primary'}
                        `}
                      />
                      <h2 className="text-center">{expert.name}</h2>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end gap-2 mt-3">
                  <DialogClose asChild>
                    <Button variant={'outline'} className="cursor-pointer">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    disabled={!topic || !selectedExpert || loading}
                    className="cursor-pointer"
                    onClick={onClickNext}
                  >
                    {loading && <LoaderCircle className="animate-spin mr-2" />}
                    Next
                  </Button>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserInputDialog;

import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const CreateDiscussionRoom = mutation({
  args: {
    coachingOption: v.string(),
    topic: v.string(),
    expertName: v.string(),
    conversation: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.insert('DiscussionRoom', {
      coachingOption: args.coachingOption,
      topic: args.topic,
      expertName: args.expertName,
    });

    return result;
  },
});

export const GetDiscussionRoom = query({
  args: {
    id: v.id('DiscussionRoom'),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.get(args.id);
    return result;
  },
});

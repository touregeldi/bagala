import { useState } from "react";

const useUserVotes = (userId) => {
    const [userVotes, setUserVotes] = useState(() => {
        if (typeof window !== "undefined") {
            return JSON.parse(localStorage.getItem(`userVotes-${userId}`)) || {};
        }
        return {};
    });

    const updateUserVote = (answerId, voteType) => {
        const existingVote = userVotes[answerId];
        const voteCountDiff = voteType === existingVote ? 0 : (voteType === "upvote" ? 1 : -1);
        const updatedUserVotes = {
            ...userVotes,
            [answerId]: {
                voteType: voteType || null,
                voteCount: (userVotes[answerId]?.voteCount || 0) + voteCountDiff,
            },
        };
        if (typeof window !== "undefined") {
            localStorage.setItem(`userVotes-${userId}`, JSON.stringify(updatedUserVotes));
        }
        setUserVotes(updatedUserVotes);
    };

    return [userVotes, updateUserVote];
};

export default useUserVotes;

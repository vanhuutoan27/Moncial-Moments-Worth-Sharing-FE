"use client"

import React, { useCallback, useState } from "react"

import { Bookmark, Heart, MessageCircle, Send } from "lucide-react"
import { AnimatePresence, motion, Variants } from "motion/react"

import { Button } from "@/components/ui/button"

interface PostActionsProps {
  isLiked: boolean
  isSaved: boolean
  onLike: () => void
  onComment: () => void
  onShare: () => void
  onSave: () => void
}

const MotionButton = motion.create(Button)

function PostActions({ isLiked, isSaved, onLike, onComment, onShare, onSave }: PostActionsProps) {
  const [showFloatingHeart, setShowFloatingHeart] = useState<boolean>(false)

  const buttonVariants: Variants = {
    initial: { scale: 1 },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  }

  const heartVariants: Variants = {
    initial: { scale: 1, rotate: 0 },
    liked: {
      scale: [1, 1.3, 1.1, 1],
      rotate: [0, -10, 10, 0],
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
        times: [0, 0.3, 0.7, 1]
      }
    }
  }

  const bookmarkVariants: Variants = {
    initial: { scale: 1, y: 0 },
    saved: {
      scale: [1, 1.2, 1],
      y: [0, -3, 0],
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }

  const floatingHeartVariant: Variants = {
    initial: { opacity: 0, scale: 0, y: 0 },
    animate: {
      opacity: [0, 1, 0],
      scale: [0, 1, 0.8],
      y: [0, -40],
      transition: {
        duration: 1.5,
        ease: [0.2, 0, 0.2, 1]
      }
    }
  }

  const handleLike = useCallback(() => {
    onLike()

    if (!isLiked) {
      setShowFloatingHeart(true)
      setTimeout(() => setShowFloatingHeart(false), 1500)
    }
  }, [isLiked, onLike])

  const handleSave = useCallback(() => {
    onSave()
  }, [onSave])

  return (
    <div className="flex items-center justify-between">
      <div className="flex space-x-1">
        <div className="relative">
          <MotionButton
            variant="ghost"
            size="icon"
            className={`${isLiked ? "bg-border" : ""} relative overflow-visible`}
            onClick={handleLike}
            variants={buttonVariants}
            initial="initial"
            whileTap="tap"
          >
            <motion.div
              variants={heartVariants}
              initial="initial"
              animate={isLiked ? "liked" : "initial"}
            >
              <Heart
                size={20}
                color={isLiked ? "var(--destructive)" : "var(--primary)"}
                fill={isLiked ? "var(--destructive)" : "none"}
                className="size-5 opacity-70"
              />
            </motion.div>
          </MotionButton>

          <AnimatePresence>
            {showFloatingHeart && (
              <motion.div
                className="pointer-events-none absolute top-1/2 left-1/2"
                variants={floatingHeartVariant}
                initial="initial"
                animate="animate"
                exit="initial"
                style={{
                  translateX: "-50%",
                  translateY: "-50%",
                  zIndex: 10
                }}
              >
                <Heart
                  size={12}
                  color="var(--destructive)"
                  fill="var(--destructive)"
                  className="opacity-80"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <MotionButton
          variant="ghost"
          size="icon"
          onClick={onComment}
          variants={buttonVariants}
          initial="initial"
          whileTap="tap"
        >
          <MessageCircle size={20} color="var(--primary)" className="size-5 opacity-70" />
        </MotionButton>

        <MotionButton
          variant="ghost"
          size="icon"
          onClick={onShare}
          variants={buttonVariants}
          initial="initial"
          whileTap="tap"
        >
          <Send size={20} color="var(--primary)" className="size-5 opacity-70" />
        </MotionButton>
      </div>

      <div className="relative">
        <MotionButton
          variant="ghost"
          size="icon"
          className={`${isSaved ? "bg-border" : ""}`}
          onClick={handleSave}
          variants={buttonVariants}
          initial="initial"
          whileTap="tap"
        >
          <motion.div
            variants={bookmarkVariants}
            initial="initial"
            animate={isSaved ? "saved" : "initial"}
          >
            <Bookmark
              size={20}
              color={isSaved ? "#eab308" : "var(--primary)"}
              fill={isSaved ? "#eab308" : "none"}
              className="size-5 opacity-70"
            />
          </motion.div>
        </MotionButton>
      </div>
    </div>
  )
}

export default PostActions

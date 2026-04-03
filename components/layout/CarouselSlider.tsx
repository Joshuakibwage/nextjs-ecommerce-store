"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { sliderData } from "@/constants";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const CarouselSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

 const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    setTimeout(() => setIsAnimating(false), 700);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  const goToPrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + sliderData.length) % sliderData.length);
    setTimeout(() => setIsAnimating(false), 700);
  };

  const handleSlideChange = (index: number) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 700);
  };

  return (
    <div className="relative w-full overflow-hidden bg-muted/30">

      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            className="min-w-full relative grid grid-cols-1 md:grid-cols-2 items-center gap-8 px-6 md:px-16 lg:px-24 py-16 md:py-20"
          >
            {/* Slide number */}
            <span className="absolute top-6 right-6 font-serif text-xs text-muted-foreground tracking-widest">
              {String(index + 1).padStart(2, '0')} / {String(sliderData.length).padStart(2, '0')}
            </span>

            {/* Text */}
            <div className="flex flex-col gap-6 order-2 md:order-1">
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-primary" />
                <span className="text-xs tracking-[0.2em] uppercase text-primary">
                  New Arrival
                </span>
              </div>
              <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-tight font-bold text-foreground">
                {slide.title}
              </h1>
              {slide.description && (
                <p className="text-sm leading-relaxed text-muted-foreground font-light max-w-sm">
                  {slide.description}
                </p>
              )}
              <div className="flex items-center gap-4 pt-2">
                <Button className="rounded-full px-8 gap-2 group">
                  {slide.buttonText1}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
                {slide.buttonText2 && (
                  <Button variant="ghost" className="rounded-full px-6 text-muted-foreground hover:text-foreground">
                    {slide.buttonText2}
                  </Button>
                )}
              </div>
            </div>

            {/* Image */}
            <div className="relative order-1 md:order-2 flex items-center justify-center">
              <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl scale-75" />
              <div className="relative w-56 h-56 md:w-80 md:h-80 lg:w-96 lg:h-96">
                <Image
                  src={slide.imgSrc}
                  alt={`Slide ${index + 1}`}
                  fill
                  className="object-contain drop-shadow-xl"
                  priority={index === 0}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors z-10 shadow-sm"
      >
        <ChevronLeft className="w-4 h-4 text-primary" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors z-10 shadow-sm"
      >
        <ChevronRight className="w-4 h-4 text-primary" />
      </button>

      {/* Dots + progress */}
      <div className="flex items-center justify-center gap-3 pb-8 pt-2">
        {sliderData.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              currentSlide === index
                ? "w-8 h-2 bg-primary"
                : "w-2 h-2 bg-foreground/20 hover:bg-foreground/40"
            }`}
          />
        ))}
      </div>

    </div>
  );
};

export default CarouselSlider;
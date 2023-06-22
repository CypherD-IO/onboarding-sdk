import { footer, select } from "../components";

declare let globalThis: any;

export const exchangeWidget = (parentElement = document.getElementById("popupBackground")) => {
  const exchangeWidgetHTML = `
    <div class="bg-primaryBg rounded-[30px] h-full w-full" id="exchange-widget">
      <div class='py-20 flex flex-col items-center justify-center font-nunito bg-primaryBg h-full mt-32 lg:mt-0'>
        <div class='px-0 lg:px-12 py-12 bg-grayBg rounded-xl w-[90%] md:w-[70%] lg:w-[70%] xl:w-[50%] flex flex-col items-center justify-center relative'>
          <div class='w-[80%] lg:w-[70%]'>
            <div class='text-center text-primaryText font-extrabold text-[24px] '> FROM</div>
            <div class='mt-3'>
              ${select({options: ['ethereum', 'ethereum', 'ethereum', 'ethereum', 'ethereum', 'ethereum']})}
            </div>

            <div class='mt-5'>
              ${select({options: ['ethereum', 'ethereum', 'ethereum', 'ethereum', 'ethereum', 'ethereum']})}
            </div>
          </div>

          <div class='bg-[#DDDDDD] h-0.5 w-10/12 my-7'>
          </div>

          <div class='w-[80%] lg:w-[70%]'>
            <div class='text-center font-extrabold text-[24px] text-primaryText'> TO</div>

            <div class='mt-3'>
              ${select({options: ['ethereum', 'ethereum', 'ethereum', 'ethereum', 'ethereum', 'ethereum']})}
            </div>

            <div class='mt-5'>
              ${select({options: ['ethereum', 'ethereum', 'ethereum', 'ethereum', 'ethereum', 'ethereum']})}
            </div>

            <div class='font-extrabold text-primaryText text-2xl text-center mt-6 mb-3'>
              <p>Choosen From Token Name</p>
            </div>
            <div
              class='flex items-center relative w-full'>
              <div
                class='-left-4 absolute flex items-center justify-center w-12 h-12 rounded-full bg-white text-sm font-semibold cursor-pointer cursor-pointer'
              >
                Max
              </div>
              <div class='w-full'>
                <input
                  class='bg-grayBg mx-3 w-full text-center text-[70px] font-bold h-[5rem] focus:outline-none text-primaryText placeholder:text-primaryText'
                  placeholder='0.00'
                  type='number'
                />
              </div>
            </div>
            <div class='text-lg text-primaryText font-regular text-center my-4'>
              Your balance
              Choosen From Token Name
            </div>
          </div>

          <div class='w-1/2 absolute -bottom-8 cursor-pointer rounded-xl flex items-center justify-center hover:scale-105 transform:ease-in-out duration-200 bg-appBg'>
            <button class="w-full h-full flex items-center justify-center p-5 ">
              Get Quote
            </button>
          </div>

          ${footer()}
        </div>
      </div>
    </div>
  `;

  if(parentElement) parentElement.innerHTML = exchangeWidgetHTML;
}

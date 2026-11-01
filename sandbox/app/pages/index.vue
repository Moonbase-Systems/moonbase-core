<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
const railItems = [
  { id: 'screen', icon: 'mdi:fit-to-screen-outline', label: 'screen' },
  { id: 'transform', icon: 'mdi:arrow-all', label: 'transform' },
  { id: 'effects', icon: 'mdi:creation-outline', label: 'effects' },
];

const activeRail = ref('transform');

const x = ref('400');
const y = ref('523');
const width = ref('300');
const height = ref('300');
const rotation = ref('0');
const corner = ref('0');
const font = ref('Arial');
const fontSize = ref('24');
const fontWeight = ref('4');
const color = ref('#ffffff');
const letterSpacing = ref('5');
const lineHeight = ref('5');
const cursorOn = ref(true);
</script>

<template>
  <div class="min-h-[100dvh] bg-surface p-lg font-roboto text-on-surface">
    <h1 class="mb-lg text-center text-heading-sm">Property inspector primitives</h1>

    <div class="mx-auto flex max-w-5xl flex-col gap-lg">
      <BasePropertyCard title="screen">
        <div class="flex flex-wrap items-end gap-md">
          <BaseSelectPill
            label="source"
            value="Acer X321 Pro"
            class="min-w-[10rem]"
          />
          <BaseToggleDot
            v-model="cursorOn"
            label="cursor"
          />
        </div>
      </BasePropertyCard>

      <div class="flex items-start gap-md">
        <BaseIconRail
          v-model="activeRail"
          :items="railItems"
        />
        <BasePropertyCard
          title="transformation"
          class="min-w-0 flex-1"
        >
          <div class="flex flex-col gap-[0.45rem]">
            <div class="flex gap-sm">
              <BaseValueField
                v-model="x"
                label="x"
                class="min-w-0 flex-1"
              />
              <BaseValueField
                v-model="y"
                label="y"
                class="min-w-0 flex-1"
              />
            </div>
            <div class="flex gap-sm">
              <BaseValueField
                v-model="width"
                label="width"
                class="min-w-0 flex-1"
              />
              <BaseValueField
                v-model="height"
                label="height"
                class="min-w-0 flex-1"
              />
            </div>
            <BaseValueField
              v-model="rotation"
              label="rotation"
              suffix="°"
              class="w-[8rem]"
            />
          </div>
          <div class="mt-xx-sm flex flex-wrap items-end gap-x-sm">
            <BaseValueField
              v-for="i in 4"
              :key="i"
              v-model="corner"
              :label="i === 1 ? 'radius' : ' '"
              class="w-[3.5rem]"
              :show-step-arrows="false"
            />
          </div>
        </BasePropertyCard>
      </div>

      <BasePropertyCard title="effects">
        <div class="flex min-h-[4rem] items-end justify-center pb-sm">
          <Icon
            name="mdi:plus"
            class="size-8 text-accent"
          />
        </div>
      </BasePropertyCard>

      <BasePropertyCard title="audio">
        <BaseSelectPill
          label="source"
          value="microphone dm30"
          class="max-w-[14rem]"
        />
      </BasePropertyCard>

      <BasePropertyCard title="text">
        <div class="flex flex-wrap items-end gap-md">
          <BaseSelectPill
            label="font"
            :value="font"
            class="min-w-[8rem]"
          />
          <BaseValueField
            v-model="fontSize"
            label="size"
            suffix="px"
            class="w-[5rem]"
          />
          <BaseValueField
            v-model="fontWeight"
            label="weight"
            class="w-[4rem]"
            :show-step-arrows="false"
          />
          <BaseColorSwatch v-model="color" />
        </div>
        <div class="mt-xx-sm flex flex-wrap items-end gap-md">
          <span class="font-roboto text-body-x-sm lowercase text-accent">space</span>
          <BaseValueField
            v-model="letterSpacing"
            label="letters"
            suffix="px"
            class="w-[5rem]"
          />
          <BaseValueField
            v-model="lineHeight"
            label="lines"
            suffix="px"
            class="w-[5rem]"
          />
        </div>
      </BasePropertyCard>
    </div>
  </div>
</template>
